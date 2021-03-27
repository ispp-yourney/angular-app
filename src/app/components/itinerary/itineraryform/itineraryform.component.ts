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
                    estimated_days: ['', Validators.required],
                    // activities: [[], Validators.required],
                    main_image: ['', Validators.required]
                })
  }

  ngOnInit(): void {
  }

  onCreate(): void {

    this.newItinerary = new ItineraryDto(this.formItiner.value.name,
                                          this.formItiner.value.description,
                                          this.formItiner.value.budget,
                                          this.formItiner.value.estimated_days,
                                          [],
                                          0,
                                          this.formItiner.value.main_image,
                                          0,
                                          []);
    
    console.log(this.newItinerary)
    this.itineraryService.nuevo(this.newItinerary)

    this.router.navigate(['/']);
  }

}
