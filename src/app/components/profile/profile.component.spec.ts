import { HttpClient } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { ShowUser } from 'src/app/models/show-user';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { DebugElement } from '@angular/core';



let component: ProfileComponent;
let fixture: ComponentFixture<ProfileComponent>;
let h4: HTMLElement;

//Stubs
let activatedRoute: ActivatedRoute


describe('Profile', ()=> {
  beforeEach(async() =>{
   
      
    TestBed.configureTestingModule({
        imports:[
         
          
        ],
        declarations:[
          ProfileComponent
        ],
        providers: [
            { 
                provide: ActivatedRoute, 
                useValue: {
                    snapshot: {
                      params: { get: username => { return 'illojuan'  } }
                    }
                  }
            }
        ]

    }).compileComponents();
  



  });

   it('should get username', () => {
        activatedRoute = TestBed.get(ActivatedRoute);
        
        expect(activatedRoute.snapshot.params.get('username')).toEqual('illojuan')

    });



})

/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { TokenService } from 'src/app/services/token.service';*/ 