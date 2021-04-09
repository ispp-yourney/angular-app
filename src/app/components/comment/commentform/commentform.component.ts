import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { Itinerary } from 'src/app/models/itinerary';
import { CommentService } from 'src/app/services/comment.service';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { TokenService } from 'src/app/services/token.service';

import { Options } from "@angular-slider/ngx-slider";

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
  comment: Comment;
  isLogged: boolean = false;
  loggedUsername:string

  options: Options = {
    floor: 1,
    ceil: 5
  };




  @Input()
  itinerary:Itinerary

  constructor(private formBuilder: FormBuilder, private itineraryService: ItineraryService,private commentService: CommentService, private tokenService: TokenService, private router: ActivatedRoute,private route:Router) { 

          this.formComment = formBuilder.group({
            content: ['', Validators.required],
            rating: [1, [Validators.required,Validators.min(1),Validators.max(5)]],
        });

    
}
  ngOnInit(): void {
    this.loggedUsername=this.tokenService.getUsername()
    this.loadComments()
    if (this.tokenService.getToken()) {
        this.isLogged = true;
    }
  }

  loadComments() {
      this.comments = this.itinerary.comments;
  }

 showComments(){
   this.clickComments = true;
   this.display = "block";
 }

 countStars(stars:number){
    return Array(stars)
 }

 countNoStars(stars:number){
  return Array(5-stars)
}



onCreate(){
  this.comment = new Comment(this.itinerary.id, this.formComment.value.content, this.formComment.value.rating);
  this.commentService.nuevo(this.comment).subscribe(
    data => {
      //console.log(data)
      this.route.navigate(['/itinerarios/' + this.itinerary.id]).then( () => {window.location.reload()} )
    }
  ,err=>{
    console.log(err)
  }
  )

}

removeComment(commentId:number){
  this.commentService.borrar(commentId).subscribe(data => {
    // console.log(data)
    this.route.navigate(['/itinerarios/' + this.itinerary.id]).then( () => {window.location.reload()} )
  }, err => {
    // console.log(err)
  })

}
  

}