import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/services/auth.service';
import { EmailConfirmationService } from 'src/app/services/email-confirmation.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  isLogged = false;
  newUser: NewUser;
  suscription: Observable<any>;

  messageError: string;
  isLoginFail = false;
  formRegister: FormGroup;
  reload:boolean = false;

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              private formBuilder: FormBuilder,
              private emailConfirmation: EmailConfirmationService,
              private toastr: ToastrService) {

                this.formRegister = formBuilder.group({
                  username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern("^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")]],
                  password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
                  firstName: ['',[Validators.required, Validators.maxLength(50), Validators.minLength(3), this.checkSpaces]],
                  lastName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), this.checkSpaces]],
                  email: ['', [Validators.email, Validators.pattern("^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"), Validators.maxLength(50), Validators.minLength(5)]],
                  acceptedTerms: ['', Validators.requiredTrue]
                })
               }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  checkSpaces(control: AbstractControl): {[key: string]: any} | null {
    const input = control.value
    if( input != null && input.trim().length == 0 ){
        return {'required': true}
    }
  }

  onRegister(): void {
    this.newUser = new NewUser(this.formRegister.value.username,
      this.formRegister.value.password,
      this.formRegister.value.firstName,
      this.formRegister.value.lastName,
      this.formRegister.value.email);
      
      this.reload = false;
      this.isLoginFail = false;
      
    this.authService.new(this.newUser).subscribe(
      response => {
        var res = response
       
       
      }, err => {
        this.isLoginFail = true;

        var returned_error = err.error.text
        if (returned_error == undefined) {
          returned_error = 'Ha ocurrido un error'
        }
        this.messageError = returned_error;
        this.reload = true

      }
    );

    };
  


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

  inputClassCheck(form:FormGroup,property: string){
    let inputClass: string;

    if(!form.get(property).touched){
      inputClass = "form-check-input"
    }else if(form?.get(property).touched && form?.get(property).valid){
      inputClass = "form-check-input is-valid"
    }else if(form?.get(property).touched && form?.get(property).invalid){
      inputClass = "form-check-input is-invalid"
    }
  
    return inputClass

    }

  reloadPage(){window.location.reload()}

  redirect(){
    this.router.navigate(['/login/']).then(() => { this.reloadPage() })
  }

  sendCode(email: string){
    this.emailConfirmation.sendConfirmationCode(email).subscribe( response =>{
        this.toastr.success("Correo de confirmación enviado correctamente.")
    }, error =>{
     
        if(error.error.text){
          this.toastr.error(error.error.text)
        }else{
          this.toastr.error("Ha ocurrido un error al reenviar el correo de confirmación.")

        }

    })
  }
 
}

 