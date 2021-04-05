import { Component, OnInit } from '@angular/core';
import { ItineraryService} from 'src/app/services/itinerary.service';
import { ActivityService } from 'src/app/services/activity.service';
import { LandmarkService } from 'src/app/services/landmark.service';
import { ActivityDto, ItineraryDto, Itinerary, LandmarkDto } from 'src/app/models/itinerary'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itineraryform',
  templateUrl: './itineraryform.component.html',
  styleUrls: ['./itineraryform.component.css']
})
export class ItineraryformComponent implements OnInit {

  newItinerary: ItineraryDto;
  auxItinerary: Itinerary;
  formItiner: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private itineraryService: ItineraryService,
              private activityService: ActivityService,
              private landmarkService: LandmarkService,
              private router: Router) {

                this.formItiner = formBuilder.group({
                    name: ['', Validators.required],
                    description: ['', Validators.required],
                    budget: ['0', [Validators.required, Validators.min(0)]],
                    //image: ['', [Validators.required, Validators.pattern("(?:https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))?")]],
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
      website: ['', Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
      instagram: ['', Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
      twitter: ['', Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]
    });

    pepe.push(activity);
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
            var newAct = new ActivityDto(0, activity.value.title, activity.value.description, dia, data.id, 0)
            this.activityService.nuevo(newAct).subscribe(
              data => {
             //console.log(data)
                var newLand = new LandmarkDto(0, activity.value.name, activity.value.description2, activity.value.price, activity.value.country, 
                  activity.value.city, activity.value.latitude, activity.value.longitude, activity.value.category, activity.value.email,
                  activity.value.phone, activity.value.website, activity.value.instagram, activity.value.twitter, data.id)
                this.landmarkService.nuevo(newLand).subscribe(
                  data => {
                 //console.log(data)
                  }, err => {
                 //console.log(err)
                  })
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
