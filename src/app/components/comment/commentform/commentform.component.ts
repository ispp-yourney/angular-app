import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { Itinerary } from 'src/app/models/itinerary';

import { ItineraryService } from 'src/app/services/itinerary.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-commentform',
  templateUrl: './commentform.component.html',
  styleUrls: ['./commentform.component.css']
})
export class CommentformComponent implements OnInit {

  isMyComment: boolean;
  comments:Array<Comment>;
  formComment: FormGroup;
  tokenUsername:string = this.tokenService.getUsername();
  clickComments: boolean=false;
 display:string = "none";



  @Input()
  itinerary:Itinerary

  constructor(private formBuilder: FormBuilder, private itineraryService: ItineraryService, private tokenService: TokenService, private router: ActivatedRoute) { 

          this.formComment = formBuilder.group({
            content: ['', Validators.required],
            rating: ['', Validators.required],
        });

    
}
  ngOnInit(): void {
    this.loadComments()
    console.log("create comment component")
  }

  loadComments() {
    
      this.comments = this.itinerary.comments;
      
  }

 showComments(){
   this.clickComments = true;
   this.display = "block";
 }

 displayDate(date:Date):string{
  return date.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })
 }

 countStars(stars:number){
    return Array(stars)
 }

 countNoStars(stars:number){
  return Array(5-stars)
}



  

}
