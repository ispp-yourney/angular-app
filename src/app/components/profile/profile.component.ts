import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShowUser } from 'src/app/models/show-user';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { TokenService } from 'src/app/services/token.service';
import { NewUser } from 'src/app/models/new-user';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails: ShowUser;
  username: String;
  messageError: String;
  incorrectUsername: boolean;
  plan: String;
  expectedUser: boolean = false;
  paypalUrl: string
  isAdmin: boolean = false;

  urlPattern = "((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+\\$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[\+~%\\/.\\w-_]*)?\\??(?:[-\\+=&;%@.\\w_]*)#?(?:[\\w]*))?)"

  showProfile: boolean = true;
  showDashboard: boolean = false;

  editForm: FormGroup;

  constructor(private tokenService: TokenService, 

              private authService: AuthService,
              private activatedRoute: ActivatedRoute, 
              private router: Router, 
              private formBuilder: FormBuilder, 
              private imageService: ImageService,
              private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.username = String(this.activatedRoute.snapshot.paramMap.get('username'));
    if(this.tokenService.getToken()){
      
      this.isAdmin = this.tokenService.getAuthorities()[0]['authority'] == 'ROLE_ADMIN';

    }
    if (String(this.tokenService.getUsername()) == this.username && this.tokenService.getToken()) {
      this.expectedUser = true;
    }

    //Si no es su perfil
    if (!this.expectedUser) {
      this.expectedUser = false;
      this.showUser(this.username);
    }

    //Si es su perfil
    else {
      this.updateUser();
    }
  }

  showUser(username: String) {
    this.authService.showUser(username).subscribe(
      data => {
        this.userDetails = data;
        this.incorrectUsername = false;
        if (this.userDetails.plan == 0) {
          this.plan = "Gratis";
        } else {
          this.plan = "Premium";
        }
      },
      err => {
        
        this.incorrectUsername = true;
        this.messageError = err.error.text;

      }
    );
  }
  
  checkSpaces(control: AbstractControl): {[key: string]: any} | null {
    const input = control.value
    if( input != null && input.trim().length == 0 ){
        return {'required': true}
    }
  }

  updateUser() {
    this.editForm = this.formBuilder.group({
                   username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
                  firstName: ['',[Validators.required, Validators.maxLength(50), Validators.minLength(3), this.checkSpaces]],
                  lastName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3),  this.checkSpaces]],
                  email: ['', [Validators.email, Validators.pattern("^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"), Validators.maxLength(50), Validators.minLength(5)]],

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
        this.editForm.controls['firstName'].setValue(this.userDetails.firstName);
        this.editForm.controls['lastName'].setValue(this.userDetails.lastName);
        this.editForm.controls['email'].setValue(this.userDetails.email);
        
      },
      err => {
        let returned_error = err.error.text
        if (returned_error) {
          this.router.navigate(["/"]).then(() => { this.reloadWindowLocation() })
        }
        this.messageError = returned_error;
      }
    );
  }

  reloadWindowLocation() {
    window.location.reload()
  }

  hrefWindowLocation(data: any) {
    window.location.href = data.text
  }

  upgradeUser() {
    this.authService.upgradeUser().subscribe(
      data => {
        this.hrefWindowLocation(data)
      },
      err => {
        this.messageError = err.error.text;
      }
    )

  }

  addUserImage(files: FileList,value) {
    
    const file = files.item(0)
    if( file?.size <= 4000000 && (file?.type == 'image/jpeg' || file?.type == 'image/png')){
      
      this.imageService.addUserPhoto(file).subscribe(
        data => {
          
          this.showUser(this.username)  // reload page
          this.toastr.success("Imagen cambiada correctamente.")
        },
        err => {
         
          if(err.error.text){
            this.toastr.error(err.error.text)
          }else{
            this.toastr.error("Se ha producido un error al actualizar la imagen.")
          }
         
        }
      )

    }else{
      
      value.value = ""
      
      if(!(file?.type == 'image/jpeg' || file?.type == 'image/png')){

        this.toastr.error("Las imágenes deben ser de tipo jpg o png.")

      }else if(!(file?.size <= 4000000)){
        this.toastr.error("Las imágenes no pueden ser superiores a 4mb.")

      }
    }


   
  }

  removeUserImage() {
    this.imageService.deleteUserPhoto().subscribe(
      data => {

        this.showUser(this.username)  // reload page
        this.toastr.success("Imagen eliminada correctamente.")

      },
      err => {
        this.toastr.error("Se ha producido un error al eliminar la imagen.")

      }
    )
  }

  onUpdate() {

    //Actualizar perfil
    var editedProfile = new NewUser(this.editForm.value.username,
      this.userDetails.password,
      this.editForm.value.firstName,
      this.editForm.value.lastName,
      this.editForm.value.email);
    this.authService.updateUser(editedProfile).subscribe(
      data => {
        this.toastr.success("Perfil actualizado correctamente.")
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(this.router.navigate(['/perfil/' + this.editForm.value.username]).then(() => { this.reloadWindowLocation() }))
          }, 2000)
        })

      }, err => {
        this.toastr.success("Se ha producido un error en la actualización del perfil.")

      }
    )
  }

  changeView(view: string) {
    if (view == "itineraries"){
      this.showProfile = false;
      this.showDashboard = false;
    } else if (view == "profile") {
      this.showProfile = true;
      this.showDashboard = false;
    } else {
      this.showProfile = false;
      this.showDashboard = true;
    }
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
}
