import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivityDto, ItineraryDto, LandmarkDto } from 'src/app/models/itinerary';
import { ShowUser } from 'src/app/models/show-user';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { TokenService } from 'src/app/services/token.service';
import { NewUser } from 'src/app/models/new-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails:ShowUser;
  username:String;
  messageError:String;
  incorrectUsername:boolean;
  plan:String;
  expectedUser: boolean =  false;
  paypalUrl: string


  showProfile: boolean = true;

  editForm: FormGroup;

  constructor(private tokenServide: TokenService, private authService: AuthService,private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private imageService: ImageService) {
   }

  ngOnInit(): void {
    this.username = String(this.activatedRoute.snapshot.paramMap.get('username'));

    if(String(this.tokenServide.getUsername()) == this.username && this.tokenServide.getToken()){
        this.expectedUser = true;
    }

    //Si no es su perfil
    if(!this.expectedUser){
      this.showUser(this.username);
    }

    //Si es su perfil
    else {
      this.updateUser();
    }
    
    
  }

  showUser(username:String){
    this.authService.showUser(username).subscribe(
      data => {
        this.userDetails=data;
        this.incorrectUsername=false;
        if (this.userDetails.plan == 0) {
          this.plan = "Gratis";
        } else {
          this.plan = "Premium";
        }
      },
      err => {
     //console.log(err)
        this.incorrectUsername=true;
        this.messageError=err.error.text;
        //this.router.navigateByUrl("/error");
    
      }
    );
  }

  updateUser() {
    this.editForm = this.formBuilder.group({
      username: new FormControl(['', Validators.required]),
      // password: new FormControl(['', Validators.required]),
      firstName: new FormControl(['', Validators.required]),
      lastName: new FormControl(['', Validators.required]),
      email: new FormControl(['', Validators.required])

    })

    this.authService.showUser(String(this.username)).subscribe(
      data => {
        this.userDetails = data;
        if (this.userDetails.plan == 0) {
          this.plan = "Gratis";
        } else {
          this.plan = "Premium";
        }

        this.editForm.controls['username'].setValue(this.userDetails.username);
        // this.editForm.controls['password'].setValue(this.userDetails.password);
        this.editForm.controls['firstName'].setValue(this.userDetails.firstName);
        this.editForm.controls['lastName'].setValue(this.userDetails.lastName);
        this.editForm.controls['email'].setValue(data.email);
        
      },
      err => {
        var returned_error = err.error.text
        if(returned_error){
          this.router.navigate(["/"]).then( () => {window.location.reload()} )
        }
        this.messageError = returned_error;
      }
    );
  }

  upgradeUser(){
    this.authService.upgradeUser().subscribe(
      data => {
        window.location.href = data.text
      },
      err => {
        this.messageError=err.error.text;
      }
    )
    
  }

  addUserImage(files: FileList) {
    const file = files.item(0)
    this.imageService.addUserPhoto(file).subscribe(
      data => {
        //console.log(data)
        this.showUser(this.username)  // reload page
      },
      err => {
        // console.log(err)
      }
    )
  }

  removeUserImage() {
    this.imageService.deleteUserPhoto().subscribe(
      data => {
        //console.log(data)
        this.showUser(this.username)  // reload page
      },
      err => {
        // console.log(err)
      }
    )
  }

  onUpdate() {
    const wait = () => {
      return new Promise((resolve, reject) => {
        setTimeout( () => {
         resolve( this.router.navigate(['/perfil/' + this.editForm.value.username]).then( () => {window.location.reload()} ))
        }, 500)
      })
    };

    //Actualizar perfil
    var editedProfile = new NewUser(this.editForm.value.username,
                                          this.userDetails.password,
                                          this.editForm.value.firstName,
                                          this.editForm.value.lastName,
                                          this.editForm.value.email);
    this.authService.updateUser(editedProfile).subscribe(
      data => {
        wait()
      }, err => {
        // console.log(err);
      }
    )
  }

  changeView() {
    this.showProfile = !this.showProfile;
  }

}
