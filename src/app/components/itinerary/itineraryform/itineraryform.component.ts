import { Component, OnInit } from '@angular/core';
import { ItineraryService} from 'src/app/services/itinerary.service';
import { ActivityService } from 'src/app/services/activity.service';
import { LandmarkService } from 'src/app/services/landmark.service';
import { ActivityDto, ItineraryDto, Itinerary, LandmarkDto } from 'src/app/models/itinerary'
import { FormBuilder, FormGroup, FormArray, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';


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

  constructor(private formBuilder: FormBuilder,
              private itineraryService: ItineraryService,
              private activityService: ActivityService,
              private landmarkService: LandmarkService,
              private router: Router) {

                this.formItiner = formBuilder.group({
                    name: ['', Validators.required],
                    description: ['', Validators.required],
                    budget: ['0', [Validators.required, Validators.min(0)]],
                    //image: ['', [Validators.required, Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")]],
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
      landmark: this.formBuilder.array([]),
      landmarkId: ['']
      
    });

    pepe.push(activity);
  }

  addLandmark(activity: FormArray){
    
    
    const landmark = this.formBuilder.group({
      name: ['', Validators.required],
      description2: ['', Validators.required],
      price: ['0', Validators.min(0)],
      country: [''],
      city: [''],
      latitude: ['', [Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.min(-180), Validators.max(180)]],
      category: [''],
      email: ['', [Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', Validators.pattern("^[+]*\\([0-9]{1,4}\\)[-\\s\\./0-9]*$")],
      website: ['', Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")],
      instagram: ['', Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")],
      twitter: ['', Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")]
    })

    activity.push(landmark); 
    
  }

  existLandmark(activity: FormGroup, data){
    console.log("sñoidfhasñoidfhñoasidhf")
    activity.controls['landmarkId'].setValue(data)
    

  }


  clickLandmarkShare(){
    console.log("ñsdfhjsod")
    this.shareLandmark = "block"
    console.log(this.shareLandmark)
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
                                          //this.formItiner.value.image,
                                          this.formItiner.value.recommendedSeason,
                                          "PUBLISHED");

 //console.log(this.newItinerary)
    this.itineraryService.nuevo(this.newItinerary).subscribe(
      data => {
     //console.log(data)
        var dia = 1
        
        for (let day of this.formItiner.get('days')['controls']) {
          for (let activity of day.get('activities')['controls']) {
            let landmark = activity.value.landmarkId
            console.log(activity.value.landmarkId)
            if(landmark == 'undefined'){
              let landmark = 0
            }
            var newAct = new ActivityDto(0, activity.value.title, activity.value.description, dia, data.id, activity.value.landmarkId)
            this.activityService.nuevo(newAct).subscribe(
              data => {
                //console.log(data)
                console.log(newAct)
              
              },
              err => {
                //console.log(err)
              }
            )
          
            
          }
          dia++;
        }
      },
      err => {
     //console.log(err)
      }
    )
    
    

    this.router.navigate(['/']);
  }

 

}
