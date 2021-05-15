import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';
import { MenuComponent } from '../../menu/menu.component';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { routes } from "../../../app-routing.module";
import { ReactiveFormsModule, FormsModule, FormBuilder } from "@angular/forms";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { LoginUser } from 'src/app/models/login-user';
import { NewUser } from 'src/app/models/new-user';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EmailConfirmationService } from 'src/app/services/email-confirmation.service';

let component: RegisterComponent;
let fixture: ComponentFixture<RegisterComponent>;

let authService: AuthService;
let tokenService: TokenService;
let emailConfirmation:EmailConfirmationService
let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;
let formBuilder: FormBuilder = new FormBuilder();
let formMock = formBuilder.group({
  text: ['']
});

let spyTokenService;

let newUser = new NewUser("testUser", "testPassword", "John", "Doe", "user@test.com");
let loginUser = new LoginUser("testUser", "testPassword");


describe('Register', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername", "getAuthorities", "setToken", "setUsername", "setAuthorities"]);
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");
    spyTokenService.getAuthorities.and.returnValue(['user']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        RegisterComponent,
        MenuComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        AuthService, EmailConfirmationService
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;

      // Returns a service with the MockBackend so we can test with dummy responses
      authService = TestBed.inject(AuthService);
      //spyAuthService.showUser.and.returnValue(showUser);
      tokenService = TestBed.inject(TokenService);
      emailConfirmation=TestBed.inject(EmailConfirmationService);
      // Inject the http service and test controller for each test
      httpTestingController = TestBed.inject(HttpTestingController);
      activatedRoute = TestBed.inject(ActivatedRoute);
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);
      formBuilder = TestBed.inject(FormBuilder);

      router.initialNavigation();
    });
  });

  afterEach(() => {
    fixture = null;
    component = null;
    authService = null;
    tokenService = null;
  });


  it('should get token ngOnInit', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.isLogged).toEqual(true)
  });

  it('should not get token ngOnInit', () => {
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.isLogged).toEqual(false)
  });

  it('should use onRegister', fakeAsync(() => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(authService, 'new').and.returnValue(of(newUser))

    fixture.detectChanges();
    component.ngOnInit()
    tick()
    component.onRegister()
    tick()
    expect(component.formRegister.valid).toEqual(false)
    let form = component.formRegister
    let usernameField = form.controls['username']
    let passwordField = form.controls['password']
    let firstNameField = form.controls['firstName']
    let lastNameField = form.controls['lastName']
    let emailField = form.controls['email']
    expect(component.isLogged).toEqual(true)
    expect(component.isLoginFail).toEqual(false)

  }));

  it('should fail use  onRegister ', fakeAsync(() => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(authService, 'new').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))

    fixture.detectChanges();
    component.ngOnInit()
    tick()
    component.onRegister()
    tick()
    expect(component.isLoginFail).toEqual(true)
    expect(component.messageError).toEqual('Error')
  }));

  it('should fail to create user and undefined error ', fakeAsync(() => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(authService, 'new').and.returnValue(throwError({
      status: 404,
      error: {
        textError: 'Error'
      }
    }))

    fixture.detectChanges();
    component.ngOnInit()
    tick()
    component.onRegister()
    tick()
    expect(component.isLoginFail).toEqual(true)
    expect(component.messageError).toEqual('Ha ocurrido un error')
  }));

  it('should use inputClass() function not touched property', fakeAsync(() => {
    // formMock.get('text').markAsTouched()
    // formMock.get('text').setErrors({ required: true })
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  }));

  it('should use inputClass() function touched property', fakeAsync(() => {
    formMock.get('text').markAsTouched()
    // formMock.get('text').setErrors({ required: true })
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  }));

  it('should use inputClass() function touched property and valid', fakeAsync(() => {
    formMock.get('text').markAsTouched()
    formMock.get('text').clearValidators()
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  }));

  it('should use inputClass() function touched property and invalid', fakeAsync(() => {
    formMock.get('text').markAsTouched()
    formMock.get('text').setErrors({ required: true })
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  }));

  it('should use inputClass() function not touched property and invalid', fakeAsync(() => {
    //formMock.get('text').markAsTouched()
    formMock.get('text').setErrors({ required: true })
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  }));

  it('should use sendCode function', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(emailConfirmation, 'sendConfirmationCode').and.returnValue(of('Correo reenviado correctamente'))
    fixture.detectChanges();

    component.sendCode("email");
    expect(component.sendCode).toBeTruthy()
  });

  it('should fail to use sendCode function', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(emailConfirmation, 'sendConfirmationCode').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))
    fixture.detectChanges();

    component.sendCode('email');
    expect(component.sendCode).toBeTruthy()
  });

  it('should fail to use sendCode function with undefined error', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(emailConfirmation, 'sendConfirmationCode').and.returnValue(throwError({
      status: 404,
      error: {
        textError: 'Error'
      }
    }))
    fixture.detectChanges();

    component.sendCode('email');
    expect(component.sendCode).toBeTruthy()
  });

  /*it('should use refresh function', () => {
    spyOn(component,'reloadPage').and.returnValue()
    spyOn(router,'navigate').and.returnValue(Promise.resolve(false))
    fixture.detectChanges();
    expect(component.redirect).toBeTruthy()
    component.redirect();
  });*/
})
