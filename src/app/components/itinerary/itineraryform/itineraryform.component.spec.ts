import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { Comment } from '../../../models/comment';
import { routes } from "../../../app-routing.module";
import { ReactiveFormsModule, FormsModule, FormBuilder, FormArray, FormControl, Validators, AbstractControl, FormGroup } from "@angular/forms";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { ShowUser } from 'src/app/models/show-user';
import { ImageService } from 'src/app/services/image.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ItineraryformComponent } from './itineraryform.component';
import { MenuComponent } from '../../menu/menu.component';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { FooterComponent } from '../../footer/footer.component';
import { Activity, Author, ItineraryDto, Landmark } from 'src/app/models/itinerary';
import { CommentformComponent } from '../../comment/commentform/commentform.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { LandmarkService } from 'src/app/services/landmark.service';
import { CountryService } from 'src/app/services/country.service';
import { BuscadorLandmarkComponent } from '../../buscador-landmark/buscador-landmark.component';



let component: ItineraryformComponent;
let fixture: ComponentFixture<ItineraryformComponent>;

let authService: AuthService;
let tokenService: TokenService;
let itineraryService: ItineraryService
let activityService: ActivityService
let imageService: ImageService
let landmarkService: LandmarkService
let countryService: CountryService

let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;
let spyTokenService;
let spyCountryService;

let countries = ["Afganistán", "Akrotiri", "Albania", "Alemania", "Andorra", "Angola", "Anguila", "Antártida", "Antigua y Barbuda", "Antillas Neerlandesas", "Arabia Saudí", "Arctic Ocean", "Argelia", "Argentina", "Armenia", "Aruba", "Ashmore andCartier Islands", "Atlantic Ocean", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bahráin", "Bangladesh", "Barbados", "Bélgica", "Belice", "Benín", "Bermudas", "Bielorrusia", "Birmania Myanmar", "Bolivia", "Bosnia y Hercegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Chad", "Chile", "China", "Chipre", "Clipperton Island", "Colombia", "Comoras", "Congo", "Coral Sea Islands", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dhekelia", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "El Vaticano", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Gaza Strip", "Georgia", "Ghana", "Gibraltar", "Granada", "Grecia", "Groenlandia", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Ecuatorial", "Guinea-Bissau", "Guyana", "Haití", "Honduras", "Hong Kong", "Hungría", "India", "Indian Ocean", "Indonesia", "Irán", "Iraq", "Irlanda", "Isla Bouvet", "Isla Christmas", "Isla Norfolk", "Islandia", "Islas Caimán", "Islas Cocos", "Islas Cook", "Islas Feroe", "Islas Georgia del Sur y Sandwich del Sur", "Islas Heard y McDonald", "Islas Malvinas", "Islas Marianas del Norte", "IslasMarshall", "Islas Pitcairn", "Islas Salomón", "Islas Turcas y Caicos", "Islas Vírgenes Americanas", "Islas Vírgenes Británicas", "Israel", "Italia", "Jamaica", "Jan Mayen", "Japón", "Jersey", "Jordania", "Kazajistán", "Kenia", "Kirguizistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Macao", "Macedonia", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Man, Isle of", "Marruecos", "Mauricio", "Mauritania", "Mayotte", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montserrat", "Mozambique", "Namibia", "Nauru", "Navassa Island", "Nepal", "Nicaragua", "Níger", "Nigeria", "Niue", "Noruega", "Nueva Caledonia", "Nueva Zelanda", "Omán", "Pacific Ocean", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa-Nueva Guinea", "Paracel Islands", "Paraguay", "Perú", "Polinesia Francesa", "Polonia", "Portugal", "Puerto Rico", "Qatar", "Reino Unido", "República Centroafricana", "República Checa", "República Democrática del Congo", "República Dominicana", "Ruanda", "Rumania", "Rusia", "Sáhara Occidental", "Samoa", "Samoa Americana", "San Cristóbal y Nieves", "San Marino", "San Pedro y Miquelón", "San Vicente y las Granadinas", "Santa Helena", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Southern Ocean", "Spratly Islands", "Sri Lanka", "Suazilandia", "Sudáfrica", "Sudán", "Suecia", "Suiza", "Surinam", "Svalbard y Jan Mayen", "Tailandia", "Taiwán", "Tanzania", "Tayikistán", "TerritorioBritánicodel Océano Indico", "Territorios Australes Franceses", "Timor Oriental", "Togo", "Tokelau", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Unión Europea", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Wake Island", "Wallis y Futuna", "West Bank", "World", "Yemen", "Yibuti", "Zambia", "Zimbabue"]
let itineraryMockDto: ItineraryDto = new ItineraryDto(0, "Itinerary test", "Description test", 1, 100, "WINTER", "DRAFT")

let formBuilder: FormBuilder = new FormBuilder();

let formMock = formBuilder.group({
  text: ['']
});

let imageMock = new File([""], "filename", { type: 'text/html' });


describe('ItineraryForm', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: id => { return '1' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername", "getAuthorities", "logOut"]);
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");

    spyTokenService.logOut.and.returnValue();
    spyCountryService = jasmine.createSpyObj(CountryService, ["getAllCountries"]);

    spyCountryService.getAllCountries.and.returnValue(of(countries))

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        ItineraryformComponent,
        MenuComponent,
        FooterComponent,
        BuscadorLandmarkComponent
      ],
      //schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        { provide: CountryService, useValue: spyCountryService },
        AuthService, ImageService, ItineraryService, ActivityService, LandmarkService,
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ItineraryformComponent);
      component = fixture.componentInstance;

      // Returns a service with the MockBackend so we can test with dummy responses
      authService = TestBed.inject(AuthService);
      //spyAuthService.showUser.and.returnValue(showUser);
      tokenService = TestBed.inject(TokenService);
      itineraryService = TestBed.inject(ItineraryService);
      activityService = TestBed.inject(ActivityService);
      imageService = TestBed.inject(ImageService);
      landmarkService = TestBed.inject(LandmarkService);
      countryService = TestBed.inject(CountryService);



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
    itineraryService = null;
    activityService = null;
    imageService = null;
    landmarkService = null;
    countryService = null;
    router = null;
  });

  it('should use loadItinerary with authorities ', () => {
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.addDay).toBeTruthy()
    component.addDay()
    //component.showActivityCreated()
  });

  it('should use addActivity function ', () => {
    let formArray = new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
    ]);
    expect(component.addActivity).toBeTruthy()
    component.addActivity(formArray)
  });

  it('should use checkPrice function ', () => {
    component.formItiner.addControl(
      'priceNormal', new FormControl('10', component.checkPrice)
    );
    component.formItiner.addControl(
      'priceRare', new FormControl('-10', component.checkPrice)
    );
    expect(component.checkPrice).toBeTruthy()
  });

  it('should use removeActivity function ', () => {
    let formArray = new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
    ]);
    expect(component.removeActivity).toBeTruthy()
    component.removeActivity(formArray, 0)
  });

  it('should use checkActivity function ', () => {
    expect(component.checkActivity).toBeTruthy()
    component.checkActivity(component.formItiner)
  });

  it('should use checkActivity function valid', () => {
    let form = new FormGroup({
      name: new FormControl(),
      age: new FormControl('20')
    });
    expect(component.checkActivity).toBeTruthy()
    fixture.detectChanges()
    component.checkActivity(form)
  });

  it('should use uploadItineraryImage function', () => {
    spyOn(imageService, 'addItineraryPhoto').and.returnValue(of('Imagen subida'))
    expect(component.uploadItineraryImage).toBeTruthy()
    fixture.detectChanges()
    component.uploadItineraryImage(imageMock, 1)
  });

  it('should fail to use uploadItineraryImage function', () => {
    spyOn(imageService, 'addItineraryPhoto').and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    expect(component.uploadItineraryImage).toBeTruthy()
    fixture.detectChanges()
    component.uploadItineraryImage(imageMock, 1)
  });

  it('should use uploadLandmarkImage function', () => {
    spyOn(imageService, 'addLandmarkPhoto').and.returnValue(of('Imagen subida'))
    expect(component.uploadLandmarkImage).toBeTruthy()
    fixture.detectChanges()
    component.uploadLandmarkImage(imageMock, 1)
  });

  it('should fail to use uploadLandmarkImage function', () => {
    spyOn(imageService, 'addLandmarkPhoto').and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    expect(component.uploadLandmarkImage).toBeTruthy()
    fixture.detectChanges()
    component.uploadLandmarkImage(imageMock, 1)
  });


  it('should use addItineraryImage function', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()
    tick();

    const getFileList = () => {
      const imageSize = "x".repeat(4000000 + 1)
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

    component.addItineraryImage(getFileList(), { value: { value: "test" } });
    flush();
  }));

  it('should use addItineraryImage function image/png', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()
    tick();

    const getFileList = () => {
      const imageSize = "x".repeat(4000000 + 1)
      const blob = new Blob([imageSize], { type: "image/png" });
      blob["lastModifiedDate"] = "";
      blob["name"] = [];

      const file = <File>blob;

      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addItineraryImage(getFileList(), { value: { value: "test" } });
    flush();
  }));

  it('should use addItineraryImage function && file?.type == image/jpeg', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()


    const getFileList = () => {
      const imageSize = "x".repeat(4000000 - 1)
      const blob = new Blob([imageSize], { type: "image/jpeg" });
      blob["lastModifiedDate"] = " ";
      blob["name"] = [];

      const file = <File>blob;

      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addItineraryImage(getFileList(), { value: { value: "test" } });
    flush();
  }));

  it('should use addItineraryImage function big size image/random', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()


    const getFileList = () => {
      const imageSize = "x".repeat(4000000 + 1)
      const blob = new Blob([imageSize], { type: "image/random" });
      blob["lastModifiedDate"] = " ";
      blob["name"] = [];

      const file = <File>blob;

      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addItineraryImage(getFileList(), { value: { value: "test" } });
    flush();
  }));

  it('should use addItineraryImage function big size image/jpeg', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit()

    let formArray = new FormArray([
      new FormControl('hola', Validators.required),
      new FormControl('hola2', Validators.required),
    ]);
    component.addDay()
    component.addActivity(formArray)
    expect(component.ngOnInit).toBeTruthy()


    const getFileList = () => {
      const imageSize = "x".repeat(4000000 - 1)
      const blob = new Blob([imageSize], { type: "image/random" });
      blob["lastModifiedDate"] = " ";
      blob["name"] = [];

      const file = <File>blob;

      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addItineraryImage(getFileList(), { value: { value: "test" } });
    flush();
  }));

  it('should use addLandmarkImage function', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()
    tick();

    const getFileList = () => {
      const imageSize = "x".repeat(4000000 + 1)
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

    component.addLandmarkImage(getFileList(), component.formItiner, { value: { value: "test" } });
    flush();
  }));

  it('should use addLandmarkImage function big size image/random', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()


    const getFileList = () => {
      const imageSize = "x".repeat(4000000 + 1)
      const blob = new Blob([imageSize], { type: "image/random" });
      blob["lastModifiedDate"] = " ";
      blob["name"] = [];

      const file = <File>blob;

      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addLandmarkImage(getFileList(), component.formItiner, { value: { value: "test" } });
    flush();
  }));

  it('should use addLandmarkImage function big size image/jpeg', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit()

    let formArray = new FormArray([
      new FormControl('landmark', Validators.required),
      new FormControl('hola2', Validators.required),
    ]);
    component.addDay()
    component.addActivity(formArray)
    expect(component.ngOnInit).toBeTruthy()


    const getFileList = () => {
      const imageSize = "x".repeat(4000000 - 1)
      const blob = new Blob([imageSize], { type: "image/random" });
      blob["lastModifiedDate"] = " ";
      blob["name"] = [];

      const file = <File>blob;

      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addLandmarkImage(getFileList(), component.formItiner, { value: { value: "test" } });
    flush();
  }));

  it('should use resetForm function ', () => {
    let form = formBuilder.group({
      title: [''],
      description: [''],
      action: [''],
      searchLandmark: [''],
      landmarkId: ['0'],
      landmarkImage: [''],
      landmarkName: [''],
      newActivity: [''],
      //landmark: ['', Validators.required],
    })
    form.addControl('landmark', formBuilder.array([]))
    expect(component.resetForm).toBeTruthy()
    fixture.detectChanges()
    component.resetForm(form)
  });

  it('should use resetForm function with invalid form', () => {
    let form = formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      action: ['', [Validators.required, Validators.maxLength(50)]],
      searchLandmark: ['', [Validators.required, Validators.maxLength(1000)]],
      landmarkId: ['0', [Validators.required, Validators.min(0)]],
      landmarkImage: ['', Validators.required],
      landmarkName: ['', Validators.required],
      newActivity: ['', Validators.required],
      //landmark: ['', Validators.required],
    })
    form.addControl('landmark', formBuilder.array([], Validators.required))
    form.get('landmarkId').setErrors({ required: true })
    expect(component.resetForm).toBeTruthy()
    fixture.detectChanges()
    component.resetForm(form)
  });
  /*
    it('should use addLandmark function ', () => {
      let form = formBuilder.group({landmark: formBuilder.array([])})
       let formArray = formBuilder.array([])
      formArray.push(form);
      expect(component.addLandmark).toBeTruthy()
      fixture.detectChanges()
      component.addLandmark(formArray)
    });
  */
  it('should use existLandmark function ', () => {
    let form = formBuilder.group({
      title: [''],
      description: [''],
      action: [''],
      searchLandmark: [''],
      landmarkId: ['0'],
      landmarkImage: [''],
      landmarkName: [''],
      landmark: formBuilder.array([])
      //landmark: ['', Validators.required],
    })
    let data = {
      name: "nombre",
      image: {
        imageUrl: "url"
      }
    }
    //form.addControl('landmark',  formBuilder.array([]))
    expect(component.existLandmark).toBeTruthy()
    fixture.detectChanges()
    component.existLandmark(form, data)
  });

  it('should use clickLandmarkShare function', () => {
    let form = formBuilder.group({
      title: [''],
      description: [''],
      action: [''],
      searchLandmark: [''],
      landmarkId: ['0'],
      landmarkImage: [''],
      landmarkName: [''],
      landmark: formBuilder.array([])
      //landmark: ['', Validators.required],
    })
    let data = {
      name: "nombre",
      image: {
        imageUrl: "url"
      }
    }
    //form.addControl('landmark',  formBuilder.array([]))
    expect(component.clickLandmarkShare).toBeTruthy()
    fixture.detectChanges()
    component.clickLandmarkShare(form, data)
  });

  it('should use removeDay function', () => {
    let form = formBuilder.group({
      title: [''],
      description: [''],
      action: [''],
      searchLandmark: [''],
      landmarkId: ['0'],
      landmarkImage: [''],
      landmarkName: [''],
      landmark: formBuilder.array([])
      //landmark: ['', Validators.required],
    })
    let data = {
      name: "nombre",
      image: {
        imageUrl: "url"
      }
    }

    expect(component.removeDay).toBeTruthy()
    fixture.detectChanges()
    component.removeDay(0)
    component.removeDay(1)
  });

  it('should use getItineraryPrice function without days', () => {
    let form = formBuilder.group({
      title: [''],
      description: [''],
      action: [''],
      searchLandmark: [''],
      landmarkId: ['0'],
      landmarkImage: [''],
      landmarkName: [''],
      landmark: formBuilder.array([]),
      days: formBuilder.array([])
      //landmark: ['', Validators.required],
    })

    expect(component.getItineraryPrice).toBeTruthy()
    fixture.detectChanges()
    component.getItineraryPrice(form)
  });

  it('should use getItineraryPrice function with activities.controls and landmarkId == "" and  landmark[0].price', () => {
    const groupFormArrayActividades = formBuilder.group({
      landmarkId: [''],
      landmark: formBuilder.array([[{ price: 10 }]])
    });
    let formArrayActivities = formBuilder.array([], new FormControl(''))
    formArrayActivities.push(groupFormArrayActividades)

    const groupFormArrayDay = formBuilder.group({
      activities: formArrayActivities,
    });
    let formArrayDay = formBuilder.array([])
    formArrayDay.push(groupFormArrayDay)
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })

    expect(component.getItineraryPrice).toBeTruthy()
    fixture.detectChanges()
    component.getItineraryPrice(itinerary)
  });

  it('should use getItineraryPrice function with activities.controls and landmarkId == "test" and  landmark[0].price', () => {
    const groupFormArrayActividades = formBuilder.group({
      landmarkId: ['test'],
      landmark: formBuilder.array([[{ price: 10 }]])
    });
    let formArrayActivities = formBuilder.array([], new FormControl(''))
    formArrayActivities.push(groupFormArrayActividades)

    const groupFormArrayDay = formBuilder.group({
      activities: formArrayActivities,
    });
    let formArrayDay = formBuilder.array([])
    formArrayDay.push(groupFormArrayDay)
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })

    expect(component.getItineraryPrice).toBeTruthy()
    fixture.detectChanges()
    component.getItineraryPrice(itinerary)
  });

  it('should use getItineraryPrice function without activities.controls', () => {
    // const groupFormArrayActividades = formBuilder.group({
    //   landmarkId : [''],
    //   landmark: formBuilder.array([[{price:10}]])
    // });
    let formArrayActivities = formBuilder.array([])
    //formArrayActivities.push(groupFormArrayActividades)
    formArrayActivities.clearValidators()
    const groupFormArrayDay = formBuilder.group({
      activities: formArrayActivities,
    });
    let formArrayDay = formBuilder.array([])
    formArrayDay.push(groupFormArrayDay)
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })

    expect(component.getItineraryPrice).toBeTruthy()
    fixture.detectChanges()
    component.getItineraryPrice(itinerary)
  });

  it('should use addedImages', () => {
    const groupFormArrayActividades = formBuilder.group({
      landmarkId: ['test'],
      landmark: formBuilder.array([[{ price: 10 }]])
    });
    let formArrayActivities = formBuilder.array([], new FormControl(''))
    formArrayActivities.push(groupFormArrayActividades)

    const groupFormArrayDay = formBuilder.group({
      activities: formArrayActivities,
    });
    let formArrayDay = formBuilder.array([])
    formArrayDay.push(groupFormArrayDay)
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })

    expect(component.getItineraryPrice).toBeTruthy()
    fixture.detectChanges()
    component.addedImages(itinerary)
  });

  it('should use onCreate() function ', fakeAsync(() => {
    spyOn(itineraryService, 'nuevo').and.returnValue(of(itineraryMockDto))
    spyOn(component, 'reloadPage').and.returnValue();
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));

    fixture.detectChanges();
    expect(component.onCreate).toBeTruthy()
    component.onCreate()
    flush()
  }));

  it('should use onCreate() function with itineraryImage ', fakeAsync(() => {
    spyOn(itineraryService, 'nuevo').and.returnValue(of(itineraryMockDto))
    spyOn(component, 'reloadPage').and.returnValue();
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));

    const imageSize = "x".repeat(4000000 - 1)
    const blob = new Blob([imageSize], { type: "image/jpeg" });
    blob["lastModifiedDate"] = " ";
    blob["name"] = [];

    const file = <File>blob;

    component.itineraryImage = file
    fixture.detectChanges();
    expect(component.onCreate).toBeTruthy()
    component.onCreate()
    flush()
  }));

  it('should fail to use onCreate() function ', fakeAsync(() => {
    spyOn(itineraryService, 'nuevo').and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    spyOn(component, 'reloadPage').and.returnValue();
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));

    fixture.detectChanges();
    expect(component.onCreate).toBeTruthy()
    component.onCreate()
    flush()
  }));

  it('should use inputClass() function not touched property', () => {
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  });

  it('should use inputClass() function touched property', () => {
    formMock.get('text').markAsTouched()
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  });

  it('should use inputClass() function touched property and valid', () => {
    formMock.get('text').markAsTouched()
    formMock.get('text').clearValidators()
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  });

  it('should use inputClass() function touched property and invalid', () => {
    formMock.get('text').markAsTouched()
    formMock.get('text').setErrors({ required: true })
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  });

  it('should use inputClass() function not touched property and invalid', () => {
    //formMock.get('text').markAsTouched()
    formMock.get('text').setErrors({ required: true })
    fixture.detectChanges();

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  });

  it('should use notificationActivity function', () => {
    let form = new FormGroup({
      newActivity: new FormControl('false')
    });
    expect(component.notificationActivity).toBeTruthy()
    fixture.detectChanges()
    component.notificationActivity(form)
  });

  it('should use notificationActivity function not new activity', () => {
    let form = new FormGroup({
      newActivity: new FormControl('true')
    });
    expect(component.notificationActivity).toBeTruthy()
    fixture.detectChanges()
    component.notificationActivity(form)
  });
})

