import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { Location } from '@angular/common';
import { TermComponent } from './terms.component';
import { MenuComponent } from '../menu/menu.component';


let component: TermComponent;
let fixture: ComponentFixture<TermComponent>;

let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;

let spyTokenService;



describe('Footer', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    let routerSpy = {
      navigate: jasmine.createSpy('navigate')
    }

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        TermComponent,
        MenuComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerSpy }
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TermComponent);
      component = fixture.componentInstance;

      // Inject the http service and test controller for each test
      httpTestingController = TestBed.inject(HttpTestingController);
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);

    });
  });

  afterEach(() => {
    fixture = null;
    component = null;
  });

  it('should create', () => {
    component.ngOnInit()
    fixture.detectChanges();
    expect(component).toBeTruthy()
  });
})
