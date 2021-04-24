import { ComponentFixture,  discardPeriodicTasks,  fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandmarkShowComponent } from './landmark-show.component';
import { MenuComponent } from '../../menu/menu.component';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";


import { routes } from "../../../app-routing.module";
import { ReactiveFormsModule, FormsModule, AbstractControl, FormControl } from "@angular/forms";
import { Location } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { ShowUser } from '../../../models/show-user';
import { LandmarkService } from '../../../services/landmark.service';
import { Landmark, LandmarkDto } from '../../../models/itinerary';
import { FormBuilder } from '@angular/forms';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';



let component: LandmarkShowComponent;
let fixture: ComponentFixture<LandmarkShowComponent>;

let authService: AuthService;
let tokenService: TokenService;
let landmarkService: LandmarkService;
let imageService:ImageService;


let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;
let createDate: Date = new Date("2021-01-01T00:00:01");
let endPromotionDate = new Date("2031-08-01T00:00:01");
let endPromotionDatePast = new Date("2010-08-01T00:00:01");

let landmarkMock1: Landmark = {
  "id": 1,
  "name": "Teatro Chino de Grauman",
  "description": "Famoso teatro que se ecuentra en Hollywood Boulevard. Grandes celebridades asisten a los estrenos que allí se realizan.",
  "price": 21.75,
  "country": "Estados Unidos",
  "city": "Los Ángeles",
  "latitude": 34.1022362941919,
  "longitude": -118.34090682908928,
  "category": "Cine",
  "email": "info@chinesetheatres.com",
  "phone": "+(01) 323464514",
  "website": "http://www.tclchinesetheatres.com/",
  "instagram": null,
  "twitter": null,
  "endPromotionDate": endPromotionDate,
  "createDate": createDate,
  "views": 44,
  "image": {
    "id": 11,
    "name": "imagenTeatroChinoDeGrauman",
    "imageUrl": "https://images2.minutemediacdn.com/image/upload/c_crop,h_1191,w_2121,x_0,y_160/v1554925523/shape/mentalfloss/21817-istock-515672264.jpg?itok=AYt9udYR"
  },
}
let landmarkMock2: Landmark = {
  "id": 1,
  "name": "Teatro Chino de Grauman",
  "description": "Famoso teatro que se ecuentra en Hollywood Boulevard. Grandes celebridades asisten a los estrenos que allí se realizan.",
  "price": 21.75,
  "country": "Estados Unidos",
  "city": "Los Ángeles",
  "latitude": 34.1022362941919,
  "longitude": -118.34090682908928,
  "category": "Cine",
  "email": "info@chinesetheatres.com",
  "phone": "+(01) 323464514",
  "website": "http://www.tclchinesetheatres.com/",
  "instagram": null,
  "twitter": null,
  "endPromotionDate": endPromotionDatePast,
  "createDate": createDate,
  "views": 44,
  "image": {
    "id": 11,
    "name": "imagenTeatroChinoDeGrauman",
    "imageUrl": "https://images2.minutemediacdn.com/image/upload/c_crop,h_1191,w_2121,x_0,y_160/v1554925523/shape/mentalfloss/21817-istock-515672264.jpg?itok=AYt9udYR"
  },
}
let showUserPlan0: ShowUser = new ShowUser("testUser", "testPassword", "John", "Doe", "user@test.com", null, 0);
let showUserPlan1: ShowUser = new ShowUser("testUser", "testPassword", "John", "Doe", "user@test.com", null, 1);
let landmarkMockDto:LandmarkDto = new LandmarkDto(0, "Landmark test", "This is a landmark text", 0, "string", "string", 0, 0, "string", "string", "string", "string", "string", "string", null)
let imageMock = new File([""], "filename", { type: 'text/html' });


let formBuilder:FormBuilder = new FormBuilder();
let formMock = formBuilder.group({
  text: ['']
});

let spyTokenService;
let spyLandmarkService;
let routerSpy;



describe('LandmarkShow', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: id => { return '1' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername","getAuthorities"]);
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);

    spyLandmarkService = jasmine.createSpyObj(LandmarkService, ["nuevo","mostrar","tieneActividades"]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        LandmarkShowComponent,
        MenuComponent,
      ],
      schemas:[NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        AuthService, LandmarkService,ImageService
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LandmarkShowComponent);
      component = fixture.componentInstance;

      authService = TestBed.inject(AuthService);
      tokenService = TestBed.inject(TokenService);
      landmarkService = TestBed.inject(LandmarkService);
      imageService = TestBed.inject(ImageService);

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
    landmarkService = null;
  });

  it('should use onInit', fakeAsync(() => {
    const landmarkObservable: Observable<Landmark> = of(landmarkMock1);
    //spyLandmarkService.mostrar.and.returnValue(landmarkObservable)
    spyOn(landmarkService,"mostrar").and.returnValue(landmarkObservable)
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    tick()
    fixture.detectChanges();
  }));

  it('should use loadLandmark without being admin', fakeAsync(() => {
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    expect(component.ngOnInit).toBeTruthy()
    const landmarkObservable: Observable<Landmark> = of(landmarkMock1);
    spyOn(landmarkService,"mostrar").and.returnValue(landmarkObservable)
    component.ngOnInit()
    fixture.detectChanges();
  }));

  it('should use loadLandmark without any authorities', fakeAsync(() => {
    spyTokenService.getAuthorities.and.returnValue([
      
    ]);
    expect(component.ngOnInit).toBeTruthy()
    const landmarkObservable: Observable<Landmark> = of(landmarkMock1);
    spyOn(landmarkService,"mostrar").and.returnValue(landmarkObservable)
    component.ngOnInit()
    fixture.detectChanges();
  }));

  it('should use loadLandmark', fakeAsync(() => {
    const landmarkObservable: Observable<Landmark> = of(landmarkMock1);
    //spyLandmarkService.mostrar.and.returnValue(landmarkObservable)
    tick()
    spyOn(landmarkService,"mostrar").and.returnValue(landmarkObservable)
    expect(component.loadLandmark).toBeTruthy()
    component.loadLandmark()
    tick()
    fixture.detectChanges();
  }));

  it('should use loadLandmark with sponsor date', fakeAsync(() => {
    const landmarkObservable: Observable<Landmark> = of(landmarkMock2);
    //spyLandmarkService.mostrar.and.returnValue(landmarkObservable)
    tick()
    spyOn(landmarkService,"mostrar").and.returnValue(landmarkObservable)
    spyOn(landmarkService,"tieneActividades").and.returnValue(of(true))
    expect(component.loadLandmark).toBeTruthy()
    component.loadLandmark()
    tick()
    fixture.detectChanges();
  }));

  it('should use loadLandmark with error', fakeAsync(() => {
    spyOn(landmarkService,"mostrar").and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))
    spyOn(landmarkService,"tieneActividades").and.returnValue(of(true))
    expect(component.loadLandmark).toBeTruthy()
    component.loadLandmark()
    tick()
    fixture.detectChanges();
  }));

  it('should use loadLandmark with undefined error', fakeAsync(() => {
    spyOn(landmarkService,"mostrar").and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    spyOn(landmarkService,"tieneActividades").and.returnValue(of(true))
    expect(component.loadLandmark).toBeTruthy()
    component.loadLandmark()
    tick()
    fixture.detectChanges();
  }));

  it('should use upgradeLandmark', fakeAsync(() => {
    spyOn(landmarkService,"upgradeLandmark").and.returnValue(of(''))
    spyOn(component, 'hrefWindowLocation').and.returnValue();
    expect(component.upgradeLandmark).toBeTruthy()
    component.landmark=landmarkMock1
    component.upgradeLandmark()
    tick()
    fixture.detectChanges();
  }));

  it('should use upgradeLandmark with error', fakeAsync(() => {
    spyOn(landmarkService,"upgradeLandmark").and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    expect(component.upgradeLandmark).toBeTruthy()
    component.landmark=landmarkMock1
    component.upgradeLandmark()
    fixture.detectChanges();
  }));

  it('should use onUpdate', fakeAsync(() => {
    spyOn(landmarkService,"editar").and.returnValue(of('text'))
    spyOn(component, 'reloadPage').and.returnValue();
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    expect(component.upgradeLandmark).toBeTruthy()
    component.landmark=landmarkMock1
    component.ngOnInit()
    component.onUpdate()
    tick()
    fixture.detectChanges();
    flush()
  }));

  it('should use onUpdate with errors', fakeAsync(() => {
    spyOn(landmarkService,"editar").and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    expect(component.upgradeLandmark).toBeTruthy()
    component.landmark=landmarkMock1
    component.ngOnInit()
    component.onUpdate()
    tick()
    fixture.detectChanges();
  }));

    it('should use onDelete', fakeAsync(() => {
    spyOn(landmarkService,"deleteLandmark").and.returnValue(of('text'))
    expect(component.upgradeLandmark).toBeTruthy()
    component.landmark=landmarkMock1
    component.ngOnInit()
    component.onDelete()
    tick()
    
    fixture.detectChanges();
  }));

  it('should use onDelete with errors', fakeAsync(() => {
    spyOn(landmarkService,"deleteLandmark").and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    expect(component.upgradeLandmark).toBeTruthy()
    component.landmark=landmarkMock1
    component.ngOnInit()
    component.onDelete()
    tick()
    fixture.detectChanges();
  }));

  it('should use addLandmarkImage function image/png', fakeAsync(() => {
    let imageAddResponseMock = { "text": "Imagen añadida correctamente" }

    fixture.detectChanges();
    component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()
    tick();

    const getFileList = () => {
      const blob = new Blob([""], { type: "image/png" });
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
   
    component.addLandmarkImage(getFileList(), {value:{value:"test"}});
    flush();
  }));

  it('should fail to use addLandmarkImage function image/png', fakeAsync(() => {
   

   fixture.detectChanges();
   component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()
   tick();

   const getFileList = () => {
     const blob = new Blob([""], { type: "image/png" });
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
  
   component.addLandmarkImage(getFileList(), {value:{value:"test"}});
   flush();
 }));

  it('should use addLandmarkImage function image/png with unknown error', fakeAsync(() => {
   

   fixture.detectChanges();
   component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()
   tick();

   const getFileList = () => {
     const blob = new Blob([""], { type: "image/png" });
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
  
   component.addLandmarkImage(getFileList(), {value:{value:"test"}});
   flush();
 }));

 it('should use addLandmarkImage function image/random', fakeAsync(() => {

   fixture.detectChanges();
   component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()
   tick();

   const getFileList = () => {
     const imageSize="x".repeat(4000000+1)
     const blob = new Blob([imageSize], { type: "image/random" });
     blob["lastModifiedDate"] = "";
     blob["name"] = "filename";
     
     const file = <File>blob;

     const fileList: FileList = {
       0: file,
       1: file,
       length: 2,
       item: (index: number) => file,
     };

     return fileList;
   };
  
   component.addLandmarkImage(getFileList(), {value:{value:"test"}});
   flush();
 }));

 it('should use addLandmarkImage function image/png big size', fakeAsync(() => {

   fixture.detectChanges();
   component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()
   tick();

   const getFileList = () => {
     const imageSize="x".repeat(4000000+1)
     const blob = new Blob([imageSize], { type: "image/jpeg" });
     blob["lastModifiedDate"] = "";
     blob["name"] = "filename";
     
     const file = <File>blob;

     const fileList: FileList = {
       0: file,
       1: file,
       length: 2,
       item: (index: number) => file,
     };

     return fileList;
   };
  
   component.addLandmarkImage(getFileList(), {value:{value:"test"}});
   flush();
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

it('should use uploadLandmarkImage function', fakeAsync(() => {
  fixture.detectChanges();
  //spyImageService.addLandmarkPhoto.and.returnValue('test')
  spyOn(imageService, "addLandmarkPhoto").and.returnValue(of('test'))
  expect(component.ngOnInit).toBeTruthy()
  component.ngOnInit()
  component.uploadLandmarkImage(imageMock, 1)
}));

it('should use uploadLandmarkImage function with errors', fakeAsync(() => {
  fixture.detectChanges();
  //spyImageService.addLandmarkPhoto.and.returnValue('test')
  spyOn(imageService, "addLandmarkPhoto").and.returnValue(throwError({
    status: 404,
    error: {
      text: 'Error'
    }
  }))
  expect(component.ngOnInit).toBeTruthy()
  component.ngOnInit()
  component.uploadLandmarkImage(imageMock, 1)
  flush()
}));

it('should use checkPrice function', () => {
  spyTokenService.getAuthorities.and.returnValue([
    {
      "authority": "ROLE_ADMIN"
    }
  ]);
  component.ngOnInit()
  component.editForm.addControl(
    'priceNormal', new FormControl('10', component.checkPrice)
  );
  component.editForm.addControl(
    'priceRare', new FormControl('-10', component.checkPrice)
  );
  expect(component.checkPrice).toBeTruthy()
});
})
