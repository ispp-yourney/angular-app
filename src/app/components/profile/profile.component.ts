import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { ActivityDto, ItineraryDto, LandmarkDto } from 'src/app/models/itinerary';
import { ShowUser } from 'src/app/models/show-user';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private tokenServide: TokenService, private authService: AuthService,private activatedRoute: ActivatedRoute, private imageService: ImageService, private router: Router) { }

  userDetails:ShowUser;
  username:String;
  messageError:String;
  incorrectUsername:boolean;
  plan:String;
  expectedUser: boolean =  false;
  paypalUrl: string

  ngOnInit(): void {
    this.username = String(this.activatedRoute.snapshot.paramMap.get('username'));
    this.showUser(this.username);

    if(String(this.tokenServide.getUsername()) == this.username && this.tokenServide.getToken()){
        this.expectedUser = true;
    }
    
    
  }

  showUser(username:String){
    this.authService.showUser(username).subscribe(
      data => {
        this.userDetails=data;
        this.incorrectUsername=false;
        if (this.userDetails.plan == 0) {
          this.plan = "Gratis";
        } else {
          this.plan = "Premium";
        }
      },
      err => {
     //console.log(err)
        this.incorrectUsername=true;
        this.messageError=err.error.text;
        //this.router.navigateByUrl("/error");
    
      }
    );
  }

  upgradeUser(){
    this.authService.upgradeUser().subscribe(
      data => {
        window.location.href = data.text
      },
      err => {
        this.messageError=err.error.text;
      }
    )
    
  }

  addUserImage(files: FileList) {
    const file = files.item(0)
    this.imageService.addUserPhoto(file).subscribe(
      data => {
        //console.log(data)
        this.showUser(this.username)  // reload page
      },
      err => {
        // console.log(err)
      }
    )
  }

  removeUserImage() {
    this.imageService.deleteUserPhoto().subscribe(
      data => {
        //console.log(data)
        this.showUser(this.username)  // reload page
      },
      err => {
        // console.log(err)
      }
    )
  }

}
