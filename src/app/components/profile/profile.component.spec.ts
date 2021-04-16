import { ComponentFixture,  fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from './profile.component';
import { MenuComponent } from '../menu/menu.component';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";


import { routes } from "../../app-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { ShowUser } from 'src/app/models/show-user';
import { ImageService } from 'src/app/services/image.service';



let component: ProfileComponent;
let fixture: ComponentFixture<ProfileComponent>;

let authService: AuthService;
let tokenService: TokenService;
let imageService: ImageService;
let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;
let showUserPlan0: ShowUser = new ShowUser("testUser", "testPassword", "John", "Doe", "user@test.com", null, 0);
let showUserPlan1: ShowUser = new ShowUser("testUser", "testPassword", "John", "Doe", "user@test.com", null, 1);
let spyTokenService;




describe('Profile', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername"]);
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule
      ],
      declarations: [
        ProfileComponent,
        MenuComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        AuthService, ImageService
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProfileComponent);
      component = fixture.componentInstance;

      // Returns a service with the MockBackend so we can test with dummy responses
      authService = TestBed.inject(AuthService);
      //spyAuthService.showUser.and.returnValue(showUser);
      tokenService = TestBed.inject(TokenService);
      imageService = TestBed.inject(ImageService);
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
  });

  it('should be expectedUser from ngOnInit', () => {
    fixture.detectChanges();
    component.ngOnInit()

    expect(activatedRoute.snapshot.paramMap.get('username')).toEqual('alejandro1cortes')
    expect(tokenService.getToken()).toEqual('tokenTest')
    expect(tokenService.getUsername()).toEqual('alejandro1cortes')
    var if_block = (String(tokenService.getUsername()) == component.username && tokenService.getToken())
    expect(if_block).toBeTruthy()
    expect(component.expectedUser).toEqual(true)
  });

  it('should not be expectedUser from ngOnInit', fakeAsync(() => {

    spyTokenService.getUsername.and.returnValue("eduardo");

    fixture.detectChanges();
    component.ngOnInit()

    expect(activatedRoute.snapshot.paramMap.get('username')).toEqual('alejandro1cortes')
    expect(tokenService.getToken()).toBeTruthy();


    expect(tokenService.getToken()).toEqual('tokenTest')
    expect(tokenService.getUsername()).toEqual('eduardo')

    var if_block = (String(tokenService.getUsername()) == component.username && tokenService.getToken())
    expect(if_block).toBeFalsy()

    tick(1000)
    expect(component.expectedUser).toBeFalsy();
  }));


  it('should use updateUser function with plan 0', fakeAsync(() => {
    spyOn(authService, 'showUser').and.returnValue(of(showUserPlan0))
    //let subShowUserSpy= spyOn(authService.showUser('alejandro1cortes'), 'subscribe')

    fixture.detectChanges();
    component.ngOnInit()

    expect(activatedRoute.snapshot.paramMap.get('username')).toEqual('alejandro1cortes')
    expect(tokenService.getToken()).toEqual('tokenTest')
    expect(tokenService.getUsername()).toEqual('alejandro1cortes')
    var if_block = (String(tokenService.getUsername()) == component.username && tokenService.getToken())
    expect(if_block).toBeTruthy()

    expect(component.expectedUser).toEqual(true)
    tick(1000);
    fixture.detectChanges();
    expect(component.userDetails).toEqual(showUserPlan0);
    expect(component.userDetails.plan).toEqual(0);

  }));

  it('should use updateUser function with plan 1', fakeAsync(() => {

    spyOn(authService, 'showUser').and.returnValue(of(showUserPlan1))
    //let subShowUserSpy= spyOn(authService.showUser('alejandro1cortes'), 'subscribe')


    fixture.detectChanges();
    component.ngOnInit()

    expect(activatedRoute.snapshot.paramMap.get('username')).toEqual('alejandro1cortes')
    expect(tokenService.getToken()).toEqual('tokenTest')
    expect(tokenService.getUsername()).toEqual('alejandro1cortes')
    var if_block = (String(tokenService.getUsername()) == component.username && tokenService.getToken())
    expect(if_block).toBeTruthy()

    expect(component.expectedUser).toEqual(true)
    tick();
    expect(component.userDetails).toEqual(showUserPlan1);
    expect(component.userDetails.plan).toEqual(1);

  }));

  it('should fail updateUser function ', fakeAsync(() => {
    spyOn(component, 'reloadWindowLocation').and.returnValue();
    spyOn(authService, 'showUser').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }));

    fixture.detectChanges();
    component.ngOnInit()

    expect(activatedRoute.snapshot.paramMap.get('username')).toEqual('alejandro1cortes')
    expect(tokenService.getToken()).toEqual('tokenTest')
    expect(tokenService.getUsername()).toEqual('alejandro1cortes')
    var if_block = (String(tokenService.getUsername()) == component.username && tokenService.getToken())
    expect(if_block).toBeTruthy()

    expect(component.expectedUser).toEqual(true)
    tick();
    expect(component.messageError).toEqual('Error')
  }));


  it('should use showUser function with plan 0', fakeAsync(() => {
    spyOn(authService, 'showUser').and.returnValue(of(showUserPlan0))

    spyTokenService.getUsername.and.returnValue("eduardo");
    fixture.detectChanges();
    component.ngOnInit()

    expect(component.expectedUser).toEqual(false)
    tick(1000);
    fixture.detectChanges();
    expect(component.userDetails).toEqual(showUserPlan0);
    expect(component.userDetails.plan).toEqual(0);
  }));

  it('should use showUser function with plan 1', fakeAsync(() => {
    spyOn(authService, 'showUser').and.returnValue(of(showUserPlan1))

    spyTokenService.getUsername.and.returnValue("eduardo");
    fixture.detectChanges();
    component.ngOnInit()

    expect(component.expectedUser).toEqual(false)
    tick(1000);
    fixture.detectChanges();
    expect(component.userDetails).toEqual(showUserPlan1);
    expect(component.userDetails.plan).toEqual(1);
    expect(component.incorrectUsername).toEqual(false);
  }));

  it('should fail updateUser function ', fakeAsync(() => {
    spyOn(component, 'reloadWindowLocation').and.returnValue();
    spyOn(authService, 'showUser').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }));
    spyTokenService.getUsername.and.returnValue("eduardo");

    fixture.detectChanges();
    component.ngOnInit()

    expect(component.expectedUser).toEqual(false)
    tick();
    expect(component.incorrectUsername).toEqual(true)
    expect(component.messageError).toEqual('Error')
  }));

  it('showUser should get undefined error message ', fakeAsync(() => {
    spyOn(component, 'reloadWindowLocation').and.returnValue();
    spyOn(authService, 'showUser').and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }));
    spyTokenService.getUsername.and.returnValue("eduardo");

    fixture.detectChanges();
    component.ngOnInit()
    tick()

    expect(component.messageError).toEqual(undefined)
  }));


  it('should use changeView ', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit()

    expect(component.expectedUser).toEqual(true)
    tick();
    component.changeView();
    tick();
    expect(component.showProfile).toEqual(false)
    component.changeView();
    tick();
    expect(component.showProfile).toEqual(true)
  }));


  it('should use updateUser function ', fakeAsync(() => {
    spyOn(authService, 'showUser').and.returnValue(of(showUserPlan0))
    const userUpdateResponseMock = { "text": "Usuario actualizado correctamente" }
    spyOn(authService, 'updateUser').and.returnValue(of(userUpdateResponseMock))

    fixture.detectChanges();
    component.ngOnInit()

    expect(component.expectedUser).toEqual(true)
    tick();
    fixture.detectChanges();
    expect(component.userDetails).toEqual(showUserPlan0);
    
    tick();
    component.onUpdate();
    
    expect(component.editForm.value.username).toEqual('testUser')
    expect(component.editForm.value.firstName).toEqual('John')
    expect(component.editForm.value.lastName).toEqual('Doe')
  }));

  it('should fail to use updateUser function ', fakeAsync(() => {
    spyOn(authService, 'showUser').and.returnValue(of(showUserPlan0))
    spyOn(authService, 'updateUser').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }));

    fixture.detectChanges();
    component.ngOnInit()

    expect(component.expectedUser).toEqual(true)
    tick(1000);
    fixture.detectChanges();
    expect(component.userDetails).toEqual(showUserPlan0);
    component.onUpdate();
  }));


  it('should use removeUserImage function ', fakeAsync(() => {
    let imageDeleteResponseMock = { "text": "Imagen eliminada correctamente" }
    spyOn(imageService, 'deleteUserPhoto').and.returnValue(of(imageDeleteResponseMock))

    fixture.detectChanges();
    component.ngOnInit()

    expect(component.expectedUser).toEqual(true)
    tick();
    component.removeUserImage();
  }));

  it('should fail to use removeUserImage function ', fakeAsync(() => {
    spyOn(imageService, 'deleteUserPhoto').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))

    fixture.detectChanges();
    component.ngOnInit()

    expect(component.expectedUser).toEqual(true)
    tick();
    component.removeUserImage();
  }));


  it('should use addUserImage function ', fakeAsync(() => {
    let imageAddResponseMock = { "text": "Imagen añadida correctamente" }
    spyOn(imageService, 'addUserPhoto').and.returnValue(of(imageAddResponseMock))

    fixture.detectChanges();
    component.ngOnInit()

    expect(component.expectedUser).toEqual(true)
    tick();

    const getFileList = () => {
      const blob = new Blob([""], { type: "text/html" });
      blob["lastModifiedDate"] = "";
      blob["name"] = "filename";
      const file = <File>blob;
      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file
      };
      return fileList;
    };
    
    component.addUserImage(getFileList());
  }));

  it('should fail use addUserImage function ', fakeAsync(() => {
    let imageAddResponseMock = { "text": "Imagen añadida correctamente" }
    spyOn(imageService, 'addUserPhoto').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))

    fixture.detectChanges();
    component.ngOnInit()

    expect(component.expectedUser).toEqual(true)
    tick();

    const getFileList = () => {
      const blob = new Blob([""], { type: "text/html" });
      blob["lastModifiedDate"] = "";
      blob["name"] = "filename";
      const file = <File>blob;
      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file
      };
      return fileList;
    };
    
    component.addUserImage(getFileList());
  }));


  it('should use upgradeUser function ', fakeAsync(() => {
    spyOn(component, 'hrefWindowLocation').and.returnValue();
    let upgradeResponseMock = { "text": "respuesta" }
    spyOn(authService, 'upgradeUser').and.returnValue(of(upgradeResponseMock))

    fixture.detectChanges();
    component.ngOnInit()

    expect(component.expectedUser).toEqual(true)
    tick();
    
    component.upgradeUser();
  }));

  it('should fail use upgradeUser function ', fakeAsync(() => {
    spyOn(component, 'hrefWindowLocation').and.returnValue();
    spyOn(authService, 'upgradeUser').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))

    fixture.detectChanges();
    component.ngOnInit()

    expect(component.expectedUser).toEqual(true)
    tick();
    
    component.upgradeUser();
    expect(component.messageError).toEqual('Error')
  }));
})
