import { Component, OnInit } from '@angular/core';
import { ItineraryService} from 'src/app/services/itinerary.service';
import { ActivityDto, ItineraryDto, Itinerary } from 'src/app/models/itinerary'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itineraryform',
  templateUrl: './itineraryform.component.html',
  styleUrls: ['./itineraryform.component.css']
})
export class ItineraryformComponent implements OnInit {

  newItinerary: ItineraryDto;
  auxItinerary: Itinerary;
  numberDays: number;
  formItiner: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private itineraryService: ItineraryService,
              private router: Router) {

                this.formItiner = formBuilder.group({
                    name: ['', Validators.required],
                    description: ['', Validators.required],
                    budget: ['', Validators.required],
                    image: ['', Validators.required],
                    recommendedSeason: ['', Validators.required],
                    days: new FormArray([])
                })
  }

  ngOnInit(): void {
    this.numberDays = 0;
  }

  get allDays() { return this.formItiner.controls.days as FormArray; }
  get daysGroup() { return this.allDays.controls as FormGroup[]; }

  onAddDays() {
    this.allDays.push(this.formBuilder.group({
      title1: ['', Validators.required],
      description1: ['', [Validators.required]],
    }));
    this.numberDays++;
  }

  

  onCreate(): void {

    this.newItinerary = new ItineraryDto(0,
                                          this.formItiner.value.name,
                                          this.formItiner.value.description,
                                          this.formItiner.value.budget,
                                          this.formItiner.value.image,
                                          this.formItiner.value.recommendedSeason);

    console.log(this.newItinerary)
    this.itineraryService.nuevo(this.newItinerary).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log(err)
      }
    )

    for (var dayF of this.daysGroup) {
      var newAct = new ActivityDto(0, dayF.value.title, dayF.value.description, 0, 1, 0);
    }

    this.router.navigate(['/']);
  }

}
