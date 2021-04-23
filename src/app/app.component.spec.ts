import { ComponentFixture,  fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";


import { routes } from "./app-routing.module";
import { ReactiveFormsModule, FormsModule, FormBuilder } from "@angular/forms";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { ShowUser } from 'src/app/models/show-user';
import { ImageService } from 'src/app/services/image.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';




let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

let authService: AuthService;
let tokenService: TokenService;

let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;
let spyTokenService;

let tokenTest="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGVqYW5kcm8xY29ydGVzIiwiaWF0IjoxNjE5MDg1MTM4LCJleHAiOjE5MTkxMjExMzh9.goSn7HlI4Sn9MsNhSbo1fZk1lkDYWkxjewz7KQJgRVhGwoErE9LbH9J7YTAdR3Wln9oB2k8Oc2LSjFGwrW7AYw"
let tokenTestExpired="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGVqYW5kcm8xY29ydGVzIiwiaWF0IjoxNjE5MDg1MTM4LCJleHAiOjE2MDAwMjExMTB9.XWNS8mn5ZYHzsqAdH8lXeS_N8y7nhTubrHGhwfabkQ_X-4s05rLOlGAVbjbKdyWREMJmcfE-ruyIuthM4Kx28w"



describe('AppComponent', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername","getAuthorities","logOut"]);
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyTokenService.logOut.and.returnValue();

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        AppComponent,
        MenuComponent,
        FooterComponent,
      ],
      schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        AuthService
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;

      // Returns a service with the MockBackend so we can test with dummy responses
      authService = TestBed.inject(AuthService);
      //spyAuthService.showUser.and.returnValue(showUser);
      tokenService = TestBed.inject(TokenService);

      // Inject the http service and test controller for each test
      httpTestingController = TestBed.inject(HttpTestingController);
      activatedRoute = TestBed.inject(ActivatedRoute);
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);
      router.initialNavigation();


    });
  });

  afterEach(() => {
    fixture = null;
    component = null;
    authService = null;
    tokenService = null;
    router=null;
  });

  it('should use ngOnInit with token', () => {
    spyTokenService.getToken.and.returnValue(tokenTest);
    fixture.detectChanges();
    expect(component.title).toEqual('yourney-angular-app')
    component.ngOnInit()
  });

  it('should use ngOnInit with expired token ', fakeAsync(() => {
    spyTokenService.getToken.and.returnValue(tokenTestExpired);
    spyOn(component, 'reload').and.returnValue();
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    fixture.detectChanges();
    expect(component.title).toEqual('yourney-angular-app')
    component.ngOnInit()
    flush()
  }));

})

