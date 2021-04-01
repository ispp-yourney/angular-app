import { Component, OnInit } from '@angular/core';
import { ItineraryService} from 'src/app/services/itinerary.service';
import { ItineraryDto } from 'src/app/models/itinerary'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itineraryform',
  templateUrl: './itineraryform.component.html',
  styleUrls: ['./itineraryform.component.css']
})
export class ItineraryformComponent implements OnInit {

  newItinerary: ItineraryDto;
  formItiner: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private itineraryService: ItineraryService,
              private router: Router) {

                this.formItiner = formBuilder.group({
                    name: ['', Validators.required],
                    description: ['', Validators.required],
                    budget: ['', Validators.required],
                    estimatedDays: ['', Validators.required],
                    image: ['', Validators.required],
                    recommendedSeason: ['', Validators.required],
                    title0_0: ['']
                })
  }

  ngOnInit(): void {
  }

  onCreate(): void {

    this.newItinerary = new ItineraryDto(0,
                                          this.formItiner.value.name,
                                          this.formItiner.value.description,
                                          this.formItiner.value.budget,
                                          this.formItiner.value.estimatedDays,
                                          this.formItiner.value.image,
                                          this.formItiner.value.recommendedSeason);
    
    console.log(this.newItinerary)
    console.log(this.formItiner.value.title0_0)
    this.itineraryService.nuevo(this.newItinerary).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log(err)
      }
    )

    this.router.navigate(['/']);
  }

}
