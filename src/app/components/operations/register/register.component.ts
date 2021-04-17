import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/models/login-user';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.formRegister = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.newUser = new NewUser(this.formRegister.value.username,
      this.formRegister.value.password,
      this.formRegister.value.firstName,
      this.formRegister.value.lastName,
      this.formRegister.value.email);

    this.authService.new(this.newUser).subscribe(
      response => {
        var res = response

        this.authService.login(new LoginUser(this.formRegister.value.username,
          this.formRegister.value.password)).subscribe(
            response => {
              var res = response

              this.isLogged = true;
              this.isLoginFail = false;

              this.tokenService.setToken(res.token);
              this.tokenService.setUsername(res.username);
              this.tokenService.setAuthorities(res.authorities);

              this.router.navigate(['/']);

            }, err => {
              this.isLogged = false;
              this.isLoginFail = true;

              var returned_error = err.error.text
              if (returned_error == undefined) {
                returned_error = 'Ha ocurrido un error'
              }
              this.messageError = returned_error;

            }
          )

      }, err => {
        this.isLogged = false;
        this.isLoginFail = true;

        var returned_error = err.error.text
        if (returned_error == undefined) {
          returned_error = 'Ha ocurrido un error'
        }
        this.messageError = returned_error;
      }
    );
  }
}