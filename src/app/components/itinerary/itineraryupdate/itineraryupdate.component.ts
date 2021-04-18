
import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Activity, ActivityDto, Itinerary, ItineraryDto, LandmarkDto } from 'src/app/models/itinerary';
import { ActivityService } from 'src/app/services/activity.service';
import { CountryService } from 'src/app/services/country.service';

import { ImageService } from 'src/app/services/image.service';
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

  constructor(private itineraryService: ItineraryService, 
    private activityService: ActivityService, 
    private landmarkService: LandmarkService, 
    private route: ActivatedRoute, 
    private tokenService: TokenService, 
    private imageService: ImageService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private countryService: CountryService) {
    
    };

  itinerary: Itinerary
  days: Array<Array<Activity>>
  listNumberDays: Array<number>
  isMyItinerary: boolean
  containError: boolean = false
  messageError: string
  activityTrash: number[] = []
  itineraryImage: File

  editLandmark: string = "none"
  shareLandmark: string = "none"

  countries: Array<string>

  ngOnInit(): void {
    this.toastr.info("Los itinerarios deben contener al menos un día y una actividad en el mismo.")

    this.countries = this.countryService.getAllCountries()

   
    
    this.editForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      description: new FormControl('data.description', [Validators.required, Validators.maxLength(1000)]),
      budget: new FormControl('0',[Validators.required, Validators.min(0)]),
      recommendedSeason: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      days: this.formBuilder.array([])
    })

    this.itineraryService.vista(Number(this.route.snapshot.paramMap.get('id'))).toPromise().then(
      data => {
     console.log(data)
        this.itinerary = data;
        this.isMyItinerary = (this.tokenService.getUsername() != null) && (this.tokenService.getUsername().length>0) && (this.tokenService.getUsername() == this.itinerary.username)
        if(!this.isMyItinerary){
          this.router.navigate(["/itinerarios/" + this.itinerary.id])
        }
        this.editForm.controls['id'].setValue(data.id);
        this.editForm.controls['name'].setValue(data.name);
        this.editForm.controls['description'].setValue(data.description);
        this.editForm.controls['budget'].setValue(data.budget);
        this.editForm.controls['recommendedSeason'].setValue(data.recommendedSeason);
        this.editForm.controls['status'].setValue(data.status);
        
        let activities: Array<Activity> = data.activities
        
        let activitiesByDay = new Map(Object.entries(this.groupByDay(activities)))
        activitiesByDay.forEach((value, key) => {

          const day = this.formBuilder.group({
            activities: this.formBuilder.array([], Validators.required)
          });

          (this.editForm.controls['days'] as FormArray).push(day)


          let acts = (new Array(activitiesByDay.get(key) as Activity[]))[0];
          
          for (let index = 0; index < acts.length; index++) {
            let activityInfo = acts[index]

            const activity = this.formBuilder.group({
              id2: [activityInfo.id],
              title: [activityInfo.title, Validators.required],
              description: [activityInfo.description, Validators.required],
              id3: [activityInfo.landmark.id],
              landmark: this.formBuilder.array([]),
              landmarkLoadImage:  [activityInfo.landmark.image.imageUrl],
              landmarkLoadName: [activityInfo.landmark.name],
              landmarkLoadPrice: [activityInfo.landmark.price],
              landmarkId: [''],
              searchLandmark: ['none'],
              action:['false'],
              newActivity:['false'],
              createActivity:['false']
             
            });


            
            (day.controls['activities'] as FormArray).push(activity)
          }

        });
        
      },
      err => {
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
      landmark: this.formBuilder.array([],Validators.required ),
      landmarkId: [''],
      landmarkLoadImage:  [''],
      landmarkLoadName: [''],
      landmarkLoadPrice: [-1],
      searchLandmark: ['none'],
      action:['true'],
      newActivity:['true'],
      createActivity:['true']
     
    });

    pepe.push(activity);
  }

  
  checkPrice(control: AbstractControl): {[key: string]: any} | null {
    const price =  parseFloat(control.value)
    if(price<0 || price >10000 ){
        return {'maxPrice': true}
    }else{
      return null
    }

  }

 

 
  

  addLandmark(activity: FormArray){
    const landmark = this.formBuilder.group({
      id3: [-1],
      name: ['', Validators.required],
      description2: ['', Validators.required],
      price: ['0', [Validators.required,this.checkPrice,Validators.maxLength(20), Validators.pattern("^[+-]?\\d*\\.?\\d{0,5}$")]],
      country: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern("^([a-zA-Z ])*$"),Validators.maxLength(100)]],
      latitude: ['', [Validators.pattern("^[+-]?\\d*\\.?\\d{0,5}$"), checkRange(-90,90)]],
      longitude: ['', [Validators.pattern("^[+-]?\\d*\\.?\\d{0,5}$"), checkRange(-180,180)]],
      category: [''],
      email: ['', [Validators.email, Validators.pattern("^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")]],
      phone: ['', Validators.pattern("^(([+][(][0-9]{1,3}[)][ ])?([0-9]{6,12}))$")],
      website: ['', [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"), Validators.maxLength(300)]],
      
      instagram: ['', [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"),Validators.maxLength(300)]],
      twitter: ['', [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"), Validators.maxLength(300)]],
      landmarkImage: [this.formBuilder.control(File)]
    });

  


    activity.controls['landmark'].push(landmark); 
    activity.controls['action'].setValue("false") 
  }

  existLandmark(activity: FormGroup, data){
    
    activity.controls['landmarkId'].setValue(data)
    console.log(data.image.imageUrl)
    activity.controls['landmarkLoadImage'].setValue(data.image.imageUrl)
    activity.controls['landmarkLoadName'].setValue(data.name)
    activity.get('landmark').disable()
    activity.controls['searchLandmark'].setValue("none")
  }


  clickLandmarkShare(activity: FormGroup, data){
    activity.controls['action'].setValue("false")
    activity.controls['searchLandmark'].setValue("block")
   
  }



  removeDay(i: number){
    let aux = this.editForm.get('days') as FormArray;
    let activities = aux.controls[i].value['activities']


    if(i == 0){

      this.toastr.info("Los itinerarios deben contener al menos un día y una actividad en el mismo.")

    }

    this.toastr.success("Día eliminado correctamente")
    for (let index = 0; index < activities.length; index++) {
      
      if (activities[index].id2 != undefined && activities[index].id2 > 0) {
        this.activityTrash.push(activities[index].id2);
      }
      
    }

    
    (this.editForm.get('days') as FormArray).removeAt(i);
  }

  removeActivity(activityList: FormArray, i: number) {
    this.toastr.success("Actividad eliminada correctamente")

    let activityId = activityList.controls[i].value['id2']
    if (activityId != undefined && activityId > 0) {
      this.activityTrash.push(activityId);
    }
    this.toastr.success("Actividad eliminada correctamente")

    activityList.removeAt(i);
  }

  groupByDay(array){
    var a = array.reduce((r, a) => {
          r[a.day] = r[a.day] || [];
          r[a.day].push(a);
          return r;
      }, Object.create(null));
    return a
  }


  getItineraryPrice(itinerary: FormGroup){

    let totalPrice: number = 0;

      if(itinerary.get('days')['controls'].length > 0){

        for (let day of itinerary.get('days')['controls']) {
            if(day.get('activities')['controls'].length > 0){
                
              for (let activity of day.get('activities')['controls']) {
                if(activity.value.landmarkId == '' ){

                  if(activity.value.landmarkLoadPrice == -1){
                    totalPrice = totalPrice + activity.value.landmark[0].price;

                  }else{
                    totalPrice = totalPrice + activity.value.landmarkLoadPrice;

                  }
                 
                }else{
                  totalPrice = totalPrice + activity.value.landmarkId.price;
                  }

                }
            }
        }
    }

    return totalPrice;

}

  onUpdate() {
    
    const wait = () => {
      return new Promise((resolve, reject) => {
        setTimeout( () => {
         resolve( this.router.navigate(['/itinerarios/' + this.editForm.value.id]).then( () => {window.location.reload()} ))
        },2000)
      })
    }


    for (let iId of this.activityTrash) {
      this.activityService.borrar(iId).subscribe(
        data => {

        }, err => {
          
        }
      )
    }

    // Actualizamos itinerario
    var totalDays = this.editForm.controls.days as FormArray;
    var numb = totalDays.length;
    console.log(this.getItineraryPrice(this.editForm))
    var newItinerary = new ItineraryDto(this.editForm.value.id,
                                          this.editForm.value.name,
                                          this.editForm.value.description,
                                          numb,
                                          this.getItineraryPrice(this.editForm),
                                          this.editForm.value.recommendedSeason,
                                          this.editForm.value.status);
    this.itineraryService.editar(newItinerary).subscribe(
      data => {
        // console.log(data)
        if(this.itineraryImage != undefined){
          this.uploadItineraryImage(this.itineraryImage, data.id)
        }
        
        var dia = 1
        for (let day of this.editForm.get('days')['controls']) {
          for (let activity of day.get('activities')['controls']) {
            let actId = activity.value.id2
            let landmark = activity.value.landmarkId

          
            var newAct = new ActivityDto(actId, activity.value.title, activity.value.description, dia, data.id, landmark == '' ? 0 : activity.value.landmarkId.id)
            if(actId >= 0) {
              this.activityService.editar(newAct).subscribe(
                data => {
                  // console.log(data);
                 
                }, err => {
                  // console.log(err);
                }
              )
            } else {
              this.activityService.nuevo(newAct).subscribe(
                data => {
               //console.log(data);
                if(landmark == ''){
               var newLand = new LandmarkDto(landmark == '' ? 0 : activity.value.landmarkId.id, activity.value.landmark[0].name, activity.value.landmark[0].description2, activity.value.landmark[0].price, activity.value.landmark[0].country,
                activity.value.landmark[0].city, activity.value.landmark[0].latitude, activity.value.landmark[0].longitude, activity.value.landmark[0].category,activity.value.landmark[0].email == '' ? null : activity.value.landmark[0].email,
                activity.value.landmark[0].phone == '' ? null : activity.value.landmark[0].phone , activity.value.landmark[0].website,activity.value.landmark[0].instagram, activity.value.landmark[0].twitter, data.id)
                console.log(newLand)
                  this.landmarkService.nuevo(newLand).subscribe(
                    data => {
                      // console.log(data);
                      if(activity.get('landmark')['controls'][0]['controls'].landmarkImage.value.name != undefined && data){
                        console.log(activity.get('landmark')['controls'][0]['controls'].landmarkImage.value.name)
                        this.uploadLandmarkImage(activity.value.landmark[0].landmarkImage, data.id)
                        }
                    }, err => {
                      // console.log(err)
                      this.toastr.error("Se ha producido un error")

                    }
                  )
                }
                }, err => {
                  // console.log(err)
                  this.toastr.error("Se ha producido un error")

                }
              )
            }
          
          }
          dia++;
        }
        //wait()
        this.toastr.success("Itinerario editado correctamente")

      }, err => {
        // console.log(err);
        this.toastr.error("Se ha producido un error")

      }
    )
  }

  addedImages(form: FormGroup){
    
    let fileNames: Array<any> = [];

    if(form.get('days')['controls'].length > 0){

      for (let day of form.get('days')['controls']) {
          if(day.get('activities')['controls'].length > 0){
              
            for (let activity of day.get('activities')['controls']) {
             if(activity.get('landmark')['controls'].length > 0){
                if(activity.value.landmarkId == '' && activity.get('createActivity').value == 'true' && activity.get('landmark')['controls'][0]['controls'].landmarkImage.value.name != undefined  ){
                    console.log("fefefw "+activity.get('landmark')['controls'][0]['controls'].landmarkImage.value.name )
                    console.log(fileNames)
                  fileNames.push(activity.get('landmark')['controls'][0]['controls'].landmarkImage.value.name)
                  
                }
            }
              }
          }
      }
  }

  return fileNames;

  }

  addItineraryImage(files: FileList, value) {
    const file = files.item(0)
    let fileNames: Array<any> = this.addedImages(this.editForm)
    if(fileNames.indexOf(file?.name) == -1){
      this.itineraryImage = files.item(0)

    }else{
      value.value = ""
      
      
      this.toastr.error("No puede subir dos fotos iguales. La imagen no se enviará.")
    }
  }

  
 
  

  addLandmarkImage(files: FileList, activity: FormGroup,value) {
    const file = files.item(0)
  
    let fileNames: Array<any> = this.addedImages(this.editForm)
    if(file?.name != this.itineraryImage?.name && fileNames.indexOf(file?.name) == -1){
      
      activity.get('landmark')['controls'][0]['controls'].landmarkImage.setValue(file)

    }else{
      
        console.log(value)
        value.value = ""
      
      
      this.toastr.error("No puede subir dos fotos iguales. La imagen no se enviará.")
    }
   
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



  inputClass(form:FormGroup,property: string){
    let inputClass: string;
  
    if(!form.get(property).touched){
      inputClass = "form-control"
    }else if(form?.get(property).touched && form?.get(property).valid){
      inputClass = "form-control is-valid"
    }else if(form?.get(property).touched && form?.get(property).invalid){
      inputClass = "form-control is-invalid"
    }
  
    return inputClass
    }
   

    resetNewForm(activity: FormGroup){
      
      activity.reset()
  
  
      activity.controls['description'].setValue("")
      activity.controls['title'].setValue("")
      
  
      activity.get('landmark')['controls'].pop()
     
  
  
      activity.controls['action'].setValue("true")
      activity.controls['searchLandmark'].setValue("none")
      activity.controls['landmarkId'].setValue("")
      activity.controls['landmarkLoadImage'].setValue("")
      activity.controls['landmarkLoadName'].setValue("")
      activity.controls['newActivity'].setValue("true")
      activity.controls['createActivity'].setValue("true")
      
      if(!activity.valid){
        this.toastr.error("La actividad no se ha completado.")
        
      }
  
      }


      resetForm(activity: FormGroup){
          console.log('activity id '+ activity)
          this.activityService.show(activity.get('id2').value).subscribe(data =>{
            console.log("activity" + data)
            let activityInfo = data
            activity.controls['title'].reset()
            activity.controls['title'].setValue(activityInfo.title)
            activity.controls['description'].reset()
            activity.controls['description'].setValue(activityInfo.description)
            
        
       
          })

        
    
        }
    
      
  
  
      notificationActivity(activity: FormGroup){

        const wait = () => {
          return new Promise((resolve, reject) => {
            setTimeout( () => {
              activity.controls['newActivity'].setValue('false')
            }, 1000)
          })
        }
    
        if(activity.get('newActivity').value == 'false'){
          this.toastr.success("Actividad editada correctamente")
        }else{
          this.toastr.success("Actividad creada correctamente")
          wait()
        }
        
      }
  

      
      checkActivity(activity: FormGroup){
  
        if(!activity.valid){
            this.toastr.error("Actividad no completada")
        }
  
      }

    
   
      
}

export function checkRange( min: number, max: number): ValidatorFn  {

  return (control: AbstractControl): ValidationErrors | null => {
    
    const value =  parseFloat(control.value)
    if(value<min|| value >max ){
        return {'range': true}
    }else{
      return null
    }

  }

  

}