import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundComponent } from './not-found.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { routes } from "../../app-routing.module";
import { Location } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

let component: NotFoundComponent;
let fixture: ComponentFixture<NotFoundComponent>;
let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;

describe('NotFound', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [
        NotFoundComponent,
        MenuComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NotFoundComponent);
      component = fixture.componentInstance;

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
  });

  it('should call ngOnInit', () => {
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.ngOnInit).toBeTruthy();
  });
})
