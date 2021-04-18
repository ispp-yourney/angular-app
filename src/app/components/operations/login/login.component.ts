import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUser: LoginUser;
  roles : string[] = [];
  messageError: string;
  formLogin: FormGroup;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.formLogin = formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    })

  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }


  onLogin(){
    this.loginUser = new LoginUser(this.formLogin.value.username, this.formLogin.value.password);
    this.authService.login(this.loginUser).subscribe(
      response => {
        var res = response
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(res.token);
        this.tokenService.setUsername(res.username);
        this.tokenService.setAuthorities(res.authorities);

        this.router.navigate(['/']);
        this.toastr.success("Sesión iniciada correctamente.")
        
        
      }, err =>{
        this.isLogged = false;
        this.isLoginFail = true;
        
        var returned_error = err.error.text
        if(returned_error == undefined){
          returned_error = 'Usuario incorrecto'
        }
        this.messageError = returned_error;
        this.toastr.error("Se ha producido un error al iniciar sesión.")

        
      }
    )
  }

  onLogout(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}

