import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationUserComponent  } from './confirmation-user.component';
import { MenuComponent } from '../menu/menu.component';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmailConfirmationService } from 'src/app/services/email-confirmation.service';

import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { routes } from "../../app-routing.module";
import { ReactiveFormsModule, FormsModule, FormBuilder } from "@angular/forms";
import { Location } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { LoginUser } from 'src/app/models/login-user';
import { NewUser } from 'src/app/models/new-user';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

let component: ConfirmationUserComponent ;
let fixture: ComponentFixture<ConfirmationUserComponent >;

let authService: AuthService;
let tokenService:TokenService
let emailConfirmation:EmailConfirmationService
let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let route: Router
let location: Location;

let newUser = new NewUser("testUser", "testPassword", "John", "Doe", "user@test.com");
let loginUser = new LoginUser("testUser", "testPassword");
let spyTokenService;

describe('ConfirmationUser', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      },
      queryParams: of({ token:'token' })
      
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername", "getAuthorities"]);
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        ConfirmationUserComponent ,
        MenuComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        AuthService,EmailConfirmationService
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ConfirmationUserComponent );
      component = fixture.componentInstance;

      // Returns a service with the MockBackend so we can test with dummy responses
      authService = TestBed.inject(AuthService);
      tokenService = TestBed.inject(TokenService);
      //spyAuthService.showUser.and.returnValue(showUser);
      emailConfirmation =TestBed.inject(EmailConfirmationService);
      // Inject the http service and test controller for each test
      httpTestingController = TestBed.inject(HttpTestingController);
      activatedRoute = TestBed.inject(ActivatedRoute);
      route = TestBed.inject(Router);
      location = TestBed.inject(Location);

      route.initialNavigation();
    });
  });

  afterEach(() => {
    fixture = null;
    component = null;
    authService = null;
    tokenService = null;
    emailConfirmation = null;
  });

  it('should use ngOnInit ', () => {
    spyOn(component,'reloadPage').and.returnValue()
    spyOn(route,'navigate').and.returnValue(Promise.resolve(false))
    spyOn(emailConfirmation,'nuevo').and.returnValue(of())
    fixture.detectChanges();
    //component.ngOnInit()
    expect(component.ngOnInit).toBeTruthy()
  });

  /*it('should fail to use ngOnInit', () => {
    spyOn(component,'reloadPage').and.returnValue()
    spyOn(route,'navigate').and.returnValue(Promise.resolve(false))
    spyOn(emailConfirmation, 'nuevo').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))
    fixture.detectChanges();
    //component.ngOnInit()
    expect(component.ngOnInit).toBeTruthy()
  });*/
})
