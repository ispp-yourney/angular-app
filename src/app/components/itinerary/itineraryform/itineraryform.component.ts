import { Component, OnInit } from '@angular/core';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { ActivityService } from 'src/app/services/activity.service';
import { LandmarkService } from 'src/app/services/landmark.service';
import { ActivityDto, ItineraryDto, Itinerary, LandmarkDto } from 'src/app/models/itinerary'
import { FormBuilder, FormGroup, FormArray, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-itineraryform',
  templateUrl: './itineraryform.component.html',
  styleUrls: ['./itineraryform.component.css']
})
export class ItineraryformComponent implements OnInit {
  idLandmark: number;
  newItinerary: ItineraryDto;
  auxItinerary: Itinerary;
  formItiner: FormGroup;

  createLandmark: string = "none"
  shareLandmark: string = "none"

  itineraryImage: File
  ocultdAddLandmark: boolean = false;

 


 

  constructor(private formBuilder: FormBuilder,
    private itineraryService: ItineraryService,
    private activityService: ActivityService,
    private landmarkService: LandmarkService,
    private imageService: ImageService,
    private router: Router) {

    this.formItiner = formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      budget: ['0', [Validators.required, Validators.min(0)]],
      recommendedSeason: ['', Validators.required],
      days: this.formBuilder.array([], Validators.required)
    })
  }

  ngOnInit(): void {
  }

  addDay(){
  
    const day = this.formBuilder.group({
      activities: this.formBuilder.array([], Validators.required)
    });

    (this.formItiner.get('days') as FormArray).push(day);

  }

  addActivity(pepe: FormArray){

  
    const activity = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      landmark: this.formBuilder.array([],Validators.required ),
      landmarkId: [''],
      searchLandmark: ['none'],
      action:['true']
      
    });



    pepe.push(activity);
  }

  addLandmark(activity: FormArray){
    const landmark = this.formBuilder.group({
      name: ['', Validators.required],
      description2: ['', Validators.required],
      price: ['0', Validators.min(0)],
      country: ['', Validators.required],
      city: ['', Validators.required],
      latitude: ['', [Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.min(-180), Validators.max(180)]],
      category: [''],
      email: ['', [Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', Validators.pattern("^[+]*\\([0-9]{1,4}\\)[-\\s\\./0-9]*$")],
      website: ['', Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")],
      instagram: ['', Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")],
      twitter: ['', Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")],
      landmarkImage: [this.formBuilder.control(File)]
    });
   
    activity.controls['landmark'].push(landmark); 
    activity.controls['action'].setValue("false")
   
  }

  existLandmark(activity: FormGroup, data){
    
    activity.controls['landmarkId'].setValue(data)
    activity.get('landmark').disable()
    activity.controls['searchLandmark'].setValue("none")
  }


  clickLandmarkShare(activity: FormGroup, data){
    activity.controls['action'].setValue("false")
    activity.controls['searchLandmark'].setValue("block")
   
  }


  removeDay(i: number){
    (this.formItiner.get('days') as FormArray).removeAt(i);
  }



  removeActivity(daysList: FormArray, i: number){
    daysList.removeAt(i);
  }


  onCreate(): void {
    var totalDays = this.formItiner.controls.days as FormArray;
    //console.log(totalDays)
    var numb = totalDays.length;
    this.newItinerary = new ItineraryDto(0,
      this.formItiner.value.name,
      this.formItiner.value.description,
      numb,
      this.formItiner.value.budget,
      this.formItiner.value.recommendedSeason,
      "PUBLISHED");

    //console.log(this.newItinerary)
    this.itineraryService.nuevo(this.newItinerary).subscribe(
      data => {
        //console.log(data)
        var dia = 1

        // add photo
        if(this.itineraryImage!=undefined){
          this.uploadItineraryImage(this.itineraryImage, data.id)
        }

        for (let day of this.formItiner.get('days')['controls']) {
          for (let activity of day.get('activities')['controls']) {
            let landmark = activity.value.landmarkId
            console.log(activity.value.landmarkId)
            if(landmark == ''){
               landmark = 0
            }
            console.log(activity.get('landmark'))
            var newAct = new ActivityDto(0, activity.value.title, activity.value.description, dia, data.id, landmark)
           console.log(newAct)
            this.activityService.nuevo(newAct).subscribe(
              data => {
                console.log(data)
                if(landmark == 0){
                  
                 var newLand = new LandmarkDto(0, activity.value.landmark[0].name, activity.value.landmark[0].description2, activity.value.landmark[0].price, activity.value.landmark[0].country,
                   activity.value.landmark[0].city, activity.value.landmark[0].latitude, activity.value.landmark[0].longitude, activity.value.landmark[0].category,activity.value.landmark[0].email,
                   activity.value.landmark[0].phone, activity.value.landmark[0].website,activity.value.landmark[0].instagram, activity.value.landmark[0].twitter, data.id)
                   console.log(newLand)
                 this.landmarkService.nuevo(newLand).subscribe(
                 data => {
                    //  console.log(data)
                    //  console.log(activity.get('landmark')['controls'][0]['controls'].landmarkImage.value.name)
                  if(activity.get('landmark')['controls'][0]['controls'].landmarkImage.value.name != 'file'){
                    
                    this.uploadLandmarkImage(activity.value.landmark[0].landmarkImage, data.id)
                    }

                 }, err => {
                   console.log(err)
                   })
                  }
              
              },
              err => {
                //console.log(err)
              }
            )

          }
          dia++;
        }
        this.router.navigate(['/']);
      },
      err => {
        //console.log(err)
      }  
    )
    
  }

  addItineraryImage(files: FileList) {
    this.itineraryImage = files.item(0)
  }

  addLandmarkImage(files: FileList, activity: FormGroup) {
    const file = files.item(0)
   
    activity.get('landmark')['controls'][0]['controls'].landmarkImage.setValue(file)
  }

  uploadItineraryImage(file: File, itineraryId: number) {
    this.imageService.addItineraryPhoto(itineraryId, file).subscribe(
      data => {
        // console.log(data)
      },
      err => {
        // console.log(err)
      }
    )
  }

  uploadLandmarkImage(file: File, landmarkId: number) {
    this.imageService.addLandmarkPhoto(landmarkId, file).subscribe(
      data => {
        // console.log(data)
      },
      err => {
        // console.log(err)
      }
    )
  }
}
