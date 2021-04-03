import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bindNodeCallback } from 'rxjs';
import { Activity, ActivityDto, Itinerary, ItineraryDto, Landmark, LandmarkDto } from 'src/app/models/itinerary';
import { ActivityService } from 'src/app/services/activity.service';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { LandmarkService } from 'src/app/services/landmark.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-itineraryupdate',
  templateUrl: './itineraryupdate.component.html',
  styleUrls: ['./itineraryupdate.component.css']
})
export class ItineraryupdateComponent implements OnInit {

  editForm: FormGroup;

  constructor(private itineraryService: ItineraryService, private activityService: ActivityService, private landmarkService: LandmarkService, private route: ActivatedRoute, private tokenService: TokenService, private router: Router, private formBuilder: FormBuilder) {
    
    };

    
    
    

  itinerary: Itinerary
  days: Array<Array<Activity>>
  listNumberDays: Array<number>
  isMyItinerary: boolean
  containError: boolean = false
  messageError: string
  activityTrash: number[] = []

  ngOnInit(): void {

    



    this.editForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      description: new FormControl('data.description', Validators.required),
      budget: new FormControl('', [Validators.required, Validators.min(0)]),
      recommendedSeason: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      days: this.formBuilder.array([])
    })

    this.itineraryService.vista(Number(this.route.snapshot.paramMap.get('id'))).toPromise().then(
      data => {
        console.log(data)
        this.itinerary = data;
        this.editForm.controls['id'].setValue(data.id);
        this.editForm.controls['name'].setValue(data.name);
        this.editForm.controls['description'].setValue(data.description);
        this.editForm.controls['budget'].setValue(data.budget);
        this.editForm.controls['recommendedSeason'].setValue(data.recommendedSeason);
        this.editForm.controls['status'].setValue(data.status);
        
        let activities: Array<Activity> = data.activities
        
        let activitiesByDay = new Map(Object.entries(this.groupByDay(activities)))
        activitiesByDay.forEach((value, key) => {
          console.log(key);

          const day = this.formBuilder.group({
            activities: this.formBuilder.array([], Validators.required)
          });

          (this.editForm.controls['days'] as FormArray).push(day)

          console.log(activitiesByDay.get(key))

          let acts = (new Array(activitiesByDay.get(key) as Activity[]))[0];
          console.log(acts)
          
          for (let index = 0; index < acts.length; index++) {
            let activityInfo = acts[index]

            const activity = this.formBuilder.group({
              id2: [activityInfo.id],
              title: [activityInfo.title, Validators.required],
              description: [activityInfo.description, Validators.required],
              id3: [activityInfo.landmark.id],
              name: [activityInfo.landmark.name, Validators.required],
              description2: [activityInfo.landmark.description, Validators.required],
              price: [activityInfo.landmark.price, Validators.min(0)],
              country: [activityInfo.landmark.country],
              city: [activityInfo.landmark.city],
              latitude: [activityInfo.landmark.latitude],
              longitude: [activityInfo.landmark.longitude],
              category: [activityInfo.landmark.category],
              email: [activityInfo.landmark.email],
              phone: [activityInfo.landmark.phone],
              website: [activityInfo.landmark.website, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
              instagram: [activityInfo.landmark.instagram, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
              twitter: [activityInfo.landmark.twitter, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]
            });
              
            (day.controls['activities'] as FormArray).push(activity)
          }

        });
        
      },
      err => {
        console.log(err)
        var returned_error = err.error.text
        if(returned_error){
          this.router.navigate(["/"]).then( () => {window.location.reload()} )
        }
        this.messageError = returned_error;
        this.containError = true
      }
    );
  }

  addDay(){

    const day = this.formBuilder.group({
      activities: this.formBuilder.array([], Validators.required)
    });
    
    (this.editForm.get('days') as FormArray).push(day);

  }

  addActivity(pepe: FormArray){
    const activity = this.formBuilder.group({
      id2: [-1], 
      title: ['', Validators.required],
      description: ['', Validators.required],
      id3: [-1],
      name: ['', Validators.required],
      description2: ['', Validators.required],
      price: ['', Validators.min(0)],
      country: [''],
      city: [''],
      latitude: [''],
      longitude: [''],
      category: [''],
      email: [''],
      phone: [''],
      website: ['', Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
      instagram: ['', Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
      twitter: ['', Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]
    });

    pepe.push(activity);
  }

  removeDay(i: number){
    let aux = this.editForm.get('days') as FormArray;
    let activities = aux.controls[i].value['activities']


    for (let index = 0; index < activities.length; index++) {
      
      if (activities[index].id2 != undefined && activities[index].id2 > 0) {
        this.activityTrash.push(activities[index].id2);
      }
      
    }

    
    (this.editForm.get('days') as FormArray).removeAt(i);
  }

  removeActivity(activityList: FormArray, i: number) {
    let activityId = activityList.controls[i].value['id2']
    console.log(activityId)
    if (activityId != undefined && activityId > 0) {
      this.activityTrash.push(activityId);
    }

    activityList.removeAt(i);
    console.log(this.activityTrash)
  }

  groupByDay(array){
    var a = array.reduce((r, a) => {
          r[a.day] = r[a.day] || [];
          r[a.day].push(a);
          return r;
      }, Object.create(null));
    return a
  }

  onUpdate() {
    const wait = () => {
      return new Promise((resolve, reject) => {
        setTimeout( () => {
         resolve( this.router.navigate(['/itinerario/' + this.editForm.value.id]).then( () => {window.location.reload()} ))
        }, 2000)
      })
    };


    // Borramos las actividades de la lista
    for (let iId of this.activityTrash) {
      this.activityService.borrar(iId).subscribe(
        data => {
          console.log(data)
        }, err => {
          console.log(err)
        }
      )
    }

    // Actualizamos itinerario
    var totalDays = this.editForm.controls.days as FormArray;
    console.log(totalDays)
    var numb = totalDays.length;
    var newItinerary = new ItineraryDto(this.editForm.value.id,
                                          this.editForm.value.name,
                                          this.editForm.value.description,
                                          numb,
                                          this.editForm.value.budget,
                                          //this.formItiner.value.image,
                                          this.editForm.value.recommendedSeason,
                                          this.editForm.value.status);
    this.itineraryService.editar(newItinerary).subscribe(
      data => {
        console.log(data)
        var dia = 1
        for (let day of this.editForm.get('days')['controls']) {
          for (let activity of day.get('activities')['controls']) {
            let actId = activity.value.id2
            let landId = activity.value.id3
            var newAct = new ActivityDto(actId, activity.value.title, activity.value.description, dia, data.id, landId)
            if(actId >= 0) {
              this.activityService.editar(newAct).subscribe(
                data => {
                  console.log(data);
                }, err => {
                  console.log(err);
                }
              )
            } else {
              this.activityService.nuevo(newAct).subscribe(
                data => {
                  console.log(data);
                  var newLand = new LandmarkDto(landId, activity.value.name, activity.value.description2, activity.value.price, activity.value.country, 
                    activity.value.city, activity.value.latitude, activity.value.longitude, activity.value.category, activity.value.email,
                    activity.value.phone, activity.value.website, activity.value.instagram, activity.value.twitter, data.id);
                  this.landmarkService.nuevo(newLand).subscribe(
                    data => {
                      console.log(data);
                    }, err => {
                      console.log(err)
                    }
                  )
                }, err => {
                  console.log(err)
                }
              )
            }
            var newLand = new LandmarkDto(landId, activity.value.name, activity.value.description2, activity.value.price, activity.value.country, 
              activity.value.city, activity.value.latitude, activity.value.longitude, activity.value.category, activity.value.email,
              activity.value.phone, activity.value.website, activity.value.instagram, activity.value.twitter, data.id);
            if(landId >= 0) {
              this.landmarkService.editar(newLand).subscribe(
                data => {
                  console.log(data);
                }, err => {
                  console.log(err);
                }
              )
            }
          }
          dia++;
        }
        wait()
      }, err => {
        console.log(err);
      }
    )
  }
}