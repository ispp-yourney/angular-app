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

// beforeEach(() => {
  
  

//   TestBed.configureTestingModule({
//     declarations: [ProfileComponent],
//     providers: [
//       {
//         provide: ActivatedRoute,
//         useValue: {
//           //paramMap: of({ get: (username:string) => { return { username: 'alejandro1corted' }; } })
//           paramMap: of({ get: (username:string) => { return  'alejandro1corted' ; } })
//         } 
//       },
//     ],
//   });
//   activatedRoute.paramMap.get;



  
//   fixture = TestBed.createComponent(ProfileComponent);
//   component = fixture.componentInstance; // ProfileComponent test instance
//   h4 = fixture.nativeElement.querySelector('h4');
// });

// it('should create', () => {

//   expect(component).toBeTruthy();
// });

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