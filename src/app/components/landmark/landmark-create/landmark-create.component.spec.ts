import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandmarkCreateComponent } from './landmark-create.component';
import { MenuComponent } from '../../menu/menu.component';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";


import { routes } from "../../../app-routing.module";
import { ReactiveFormsModule, FormsModule, AbstractControl } from "@angular/forms";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { ShowUser } from '../../../models/show-user';
import { ImageService } from '../../../services/image.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LandmarkService } from '../../../services/landmark.service';
import { CountryService } from '../../../services/country.service';
import { LandmarkDto } from '../../../models/itinerary';
import { ItineraryformComponent } from '../../itinerary/itineraryform/itineraryform.component';
import { FormBuilder } from '@angular/forms';
import { BuscadorLandmarkComponent } from '../../buscador-landmark/buscador-landmark.component';



let component: LandmarkCreateComponent;
let fixture: ComponentFixture<LandmarkCreateComponent>;

let authService: AuthService;
let tokenService: TokenService;
let imageService: ImageService;
let landmarkService: LandmarkService;
let countryService: CountryService;
let toastr: ToastrService;

let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;
let showUserPlan0: ShowUser = new ShowUser("testUser", "testPassword", "John", "Doe", "user@test.com", null, 0);
let showUserPlan1: ShowUser = new ShowUser("testUser", "testPassword", "John", "Doe", "user@test.com", null, 1);
let countries = ["Afganist??n", "Akrotiri", "Albania", "Alemania", "Andorra", "Angola", "Anguila", "Ant??rtida", "Antigua y Barbuda", "Antillas Neerlandesas", "Arabia Saud??", "Arctic Ocean", "Argelia", "Argentina", "Armenia", "Aruba", "Ashmore andCartier Islands", "Atlantic Ocean", "Australia", "Austria", "Azerbaiy??n", "Bahamas", "Bahr??in", "Bangladesh", "Barbados", "B??lgica", "Belice", "Ben??n", "Bermudas", "Bielorrusia", "Birmania Myanmar", "Bolivia", "Bosnia y Hercegovina", "Botsuana", "Brasil", "Brun??i", "Bulgaria", "Burkina Faso", "Burundi", "But??n", "Cabo Verde", "Camboya", "Camer??n", "Canad??", "Chad", "Chile", "China", "Chipre", "Clipperton Island", "Colombia", "Comoras", "Congo", "Coral Sea Islands", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dhekelia", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "El Vaticano", "Emiratos ??rabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "Espa??a", "Estados Unidos", "Estonia", "Etiop??a", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gab??n", "Gambia", "Gaza Strip", "Georgia", "Ghana", "Gibraltar", "Granada", "Grecia", "Groenlandia", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Ecuatorial", "Guinea-Bissau", "Guyana", "Hait??", "Honduras", "Hong Kong", "Hungr??a", "India", "Indian Ocean", "Indonesia", "Ir??n", "Iraq", "Irlanda", "Isla Bouvet", "Isla Christmas", "Isla Norfolk", "Islandia", "Islas Caim??n", "Islas Cocos", "Islas Cook", "Islas Feroe", "Islas Georgia del Sur y Sandwich del Sur", "Islas Heard y McDonald", "Islas Malvinas", "Islas Marianas del Norte", "IslasMarshall", "Islas Pitcairn", "Islas Salom??n", "Islas Turcas y Caicos", "Islas V??rgenes Americanas", "Islas V??rgenes Brit??nicas", "Israel", "Italia", "Jamaica", "Jan Mayen", "Jap??n", "Jersey", "Jordania", "Kazajist??n", "Kenia", "Kirguizist??n", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "L??bano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Macao", "Macedonia", "Madagascar", "Malasia", "Malaui", "Maldivas", "Mal??", "Malta", "Man, Isle of", "Marruecos", "Mauricio", "Mauritania", "Mayotte", "M??xico", "Micronesia", "Moldavia", "M??naco", "Mongolia", "Montserrat", "Mozambique", "Namibia", "Nauru", "Navassa Island", "Nepal", "Nicaragua", "N??ger", "Nigeria", "Niue", "Noruega", "Nueva Caledonia", "Nueva Zelanda", "Om??n", "Pacific Ocean", "Pa??ses Bajos", "Pakist??n", "Palaos", "Panam??", "Pap??a-Nueva Guinea", "Paracel Islands", "Paraguay", "Per??", "Polinesia Francesa", "Polonia", "Portugal", "Puerto Rico", "Qatar", "Reino Unido", "Rep??blica Centroafricana", "Rep??blica Checa", "Rep??blica Democr??tica del Congo", "Rep??blica Dominicana", "Ruanda", "Rumania", "Rusia", "S??hara Occidental", "Samoa", "Samoa Americana", "San Crist??bal y Nieves", "San Marino", "San Pedro y Miquel??n", "San Vicente y las Granadinas", "Santa Helena", "Santa Luc??a", "Santo Tom?? y Pr??ncipe", "Senegal", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Southern Ocean", "Spratly Islands", "Sri Lanka", "Suazilandia", "Sud??frica", "Sud??n", "Suecia", "Suiza", "Surinam", "Svalbard y Jan Mayen", "Tailandia", "Taiw??n", "Tanzania", "Tayikist??n", "TerritorioBrit??nicodel Oc??ano Indico", "Territorios Australes Franceses", "Timor Oriental", "Togo", "Tokelau", "Tonga", "Trinidad y Tobago", "T??nez", "Turkmenist??n", "Turqu??a", "Tuvalu", "Ucrania", "Uganda", "Uni??n Europea", "Uruguay", "Uzbekist??n", "Vanuatu", "Venezuela", "Vietnam", "Wake Island", "Wallis y Futuna", "West Bank", "World", "Yemen", "Yibuti", "Zambia", "Zimbabue"]
let landmarkMockDto: LandmarkDto = new LandmarkDto(0, "Landmark test", "This is a landmark text", 0, "string", "string", 0, 0, "string", "string", "string", "string", "string", "string", null)
let imageMock = new File([""], "filename", { type: 'text/html' });

let formBuilder: FormBuilder = new FormBuilder();
let formMock = formBuilder.group({
  text: ['']
});

let spyTokenService;
let spyImageService;
let spyLandmarkService;
let spyCountryService;
let spyToastr

describe('LandmarkCreate', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername", "getAuthorities"]);
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);

    spyCountryService = jasmine.createSpyObj(CountryService, ["getAllCountries"]);
    spyCountryService.getAllCountries.and.returnValue(countries);
    spyLandmarkService = jasmine.createSpyObj(LandmarkService, ["nuevo"]);
    //spyImageService = jasmine.createSpyObj(ImageService, ["addLandmarkPhoto"]);
    spyToastr = jasmine.createSpyObj(ToastrService, ["error"]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        LandmarkCreateComponent,
        MenuComponent,
        ItineraryformComponent,
        BuscadorLandmarkComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        AuthService, ImageService, CountryService, LandmarkService, ToastrService
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LandmarkCreateComponent);
      component = fixture.componentInstance;

      authService = TestBed.inject(AuthService);
      tokenService = TestBed.inject(TokenService);
      imageService = TestBed.inject(ImageService);
      landmarkService = TestBed.inject(LandmarkService);
      countryService = TestBed.inject(CountryService);
      toastr = TestBed.inject(ToastrService)

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
    imageService = null;
    landmarkService = null;
    countryService = null;
  });

  it('should use onCreate function', fakeAsync(() => {
    spyOn(landmarkService, "nuevo").and.returnValue(of(''))
    spyCountryService.getAllCountries.and.returnValue(countries);
    spyOn(component, 'reloadWindow').and.returnValue();
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyToastr.error.and.returnValue();
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();

    expect(component.onCreate).toBeTruthy()
    component.onCreate()
    flush()

  }));

  it('should use onCreate function with negative price', fakeAsync(() => {
    component.formLandmark.controls['price'].setValue(-50)
    spyOn(landmarkService, "nuevo").and.returnValue(of(''))
    spyCountryService.getAllCountries.and.returnValue(countries);
    spyOn(component, 'reloadWindow').and.returnValue();
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyToastr.error.and.returnValue();
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();

    expect(component.onCreate).toBeTruthy()
    component.onCreate()
    flush()

  }));

  it('should use onCreate with landmark image', fakeAsync(() => {
    component.formLandmark.controls['landmarkImage'].setValue({ name: "nombre" })
    spyOn(landmarkService, "nuevo").and.returnValue(of(''))
    spyCountryService.getAllCountries.and.returnValue(countries);
    spyOn(component, 'reloadWindow').and.returnValue();
    spyToastr.error.and.returnValue();
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();

    expect(component.onCreate).toBeTruthy()
    component.onCreate()
    flush()
  }));

  it('should use onCreate with errors', fakeAsync(() => {
    spyOn(landmarkService, "nuevo").and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))
    spyCountryService.getAllCountries.and.returnValue(countries);
    spyOn(component, 'reloadWindow').and.returnValue();
    spyToastr.error.and.returnValue();
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();

    expect(component.onCreate).toBeTruthy()
    component.onCreate()
    flush()
  }));

  it('should use inputClass() function not matching any if', fakeAsync(() => {
    formMock.get('text').markAsTouched()
    formMock.get('text').setErrors({ required: true })
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  }));

  it('should use inputClass() function not matching any if', fakeAsync(() => {
    formMock.get('text').markAsTouched()
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  }));

  it('should use inputClass() function not matching else of second else if', fakeAsync(() => {
    formMock.get('text').markAsTouched()
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  }));

  it('should use inputClass() function  matching first else if 2', fakeAsync(() => {
    formMock.get('text').markAsTouched()
    fixture.detectChanges();
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  }));

  // it('should use addLandmarkImage function', fakeAsync(() => {
  //   fixture.detectChanges();
  //   const getFileList = () => {
  //     const blob = new Blob([""], { type: "text/html" });
  //     blob["lastModifiedDate"] = "";
  //     blob["name"] = "filename";
  //     const file = <File>blob;
  //     // @ts-ignore
  //     const fileList: FileList = {
  //       0: file,
  //       1: file,
  //       length: 2,
  //       item: (index: number) => file
  //     };
  //     return fileList;
  //   };
  //   component.ngOnInit()
  //   component.addLandmarkImage(getFileList())
  //   expect(component.inputClass(formMock, 'text')).toBeTruthy()
  //   component.inputClass(formMock, 'text')
  // }));

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
  }));

  it('should use addLandmarkImage function image/png', fakeAsync(() => {
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
   let imageAddResponseMock = { "text": "Imagen a??adida correctamente" }
   spyOn(imageService, 'addUserPhoto').and.returnValue(throwError({
     status: 404,
     error: {
       text: 'true'
     }
   }))

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
   let imageAddResponseMock = { "text": "Imagen a??adida correctamente" }
   spyOn(imageService, 'addUserPhoto').and.returnValue(throwError({
     status: 404,
     error: {
       text: false
     }
   }))

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
   let imageAddResponseMock = { "text": "Imagen a??adida correctamente" }
   spyOn(imageService, 'addUserPhoto').and.returnValue(of(imageAddResponseMock))

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
   let imageAddResponseMock = { "text": "Imagen a??adida correctamente" }
   spyOn(imageService, 'addUserPhoto').and.returnValue(of(imageAddResponseMock))

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
})
