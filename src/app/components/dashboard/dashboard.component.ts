import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  yAxis = { display: true, labelString: "Hola"}
  // Configuracion del grafico
  public barChartOptions: ChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: this.yAxis,
        ticks: {
            beginAtZero: true
        }
      }]
  }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

  // Formulario de busqueda
  city: string[] = [];
  country: string[] = [];
  function: string[] = [];
  formFilter: FormGroup;
  messageError: string;

  constructor(private dashboardService: DashboardService, private formBuilder:FormBuilder, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private router: Router) { 
    this.formFilter = formBuilder.group({
      country: [''],
      city: [''],
      function: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.dashboardService.getAllCountry().subscribe(c => {this.country = c;} )
  }

  onRegister(){
    //Limpiar todos los campos inicializados
    let dataLength = this.barChartData.length
    if (this.barChartData.length > 0) {
      for (let i = 0; i < dataLength; i++) 
      { this.barChartData.pop() }
    }
    this.messageError = null;

    let country = this.formFilter.controls.country?.value
    let city = this.formFilter.controls.city?.value
    
    switch(this.formFilter.controls.function?.value) {
      case "ItinerariosMasVisitas":
        this.dashboardService.itinerariosOrdenadosPorVisualizaciones(country,city).subscribe(
          data => {
            this.barChartLabels = ["Itinerarios con más visualizaciones"]
            this.yAxis.labelString = "Número de visualizaciones"
            for (let i = 0; i < data.content.length; i++){
              let itinerary = data.content[i];
              this.barChartData.push({ data: [itinerary.views], label: itinerary.name })
            }

            if (this.barChartData.length == 0) {this.messageError = "No hay datos según el criterio de busqueda introducido."}
          }
        );

        break;
      case "LandmarksMasVisitas":
        this.dashboardService.landmarkOrdenadosPorVisualizaciones(country,city).subscribe(
          data => {
            this.barChartLabels = ["Puntos de interés con más visualizaciones"]
            this.yAxis.labelString = "Número de visualizaciones"
            for (let i = 0; i < data.content.length; i++){
              let itinerary = data.content[i];
              this.barChartData.push({ data: [itinerary.views], label: itinerary.name })
            }

            if (this.barChartData.length == 0) {this.messageError = "No hay datos según el criterio de busqueda introducido."}
          }
        );

        break;
      case "ItinerariosMasComentarios":
        this.dashboardService.itinerariosOrdenadosPorComentarios(country,city).subscribe(
          data => {
            this.barChartLabels = ["Itinerarios con más comentarios"]
            this.yAxis.labelString = "Número de comentarios"
            for (let i = 0; i < data.content.length; i++){
              let itinerary = data.content[i];
              this.barChartData.push({ data: [itinerary.countComments], label: itinerary.name })
            }

            if (this.barChartData.length == 0) {this.messageError = "No hay datos según el criterio de busqueda introducido."}
          }
        );

        break;
      case "ItinerariosMejorValoracion":
        this.dashboardService.itinerariosOrdenadosPorValoracion(country,city).subscribe(
          data => {
            this.barChartLabels = ["Itinerarios con mejor valoración"]
            this.yAxis.labelString = "Número de valoraciones"
            for (let i = 0; i < data.content.length; i++){
              let itinerary = data.content[i];
              this.barChartData.push({ data: [itinerary.avgRating], label: itinerary.name })
            }

            if (this.barChartData.length == 0) {this.messageError = "No hay datos según el criterio de busqueda introducido."}
          }
        );

        break;
      case "UltimosItinerariosMejorValoracion":
        this.dashboardService.ultimosItinerariosOrdenadosPorValoracion(country,city).subscribe(
          data => {
            this.barChartLabels = ["Últimos itinerarios con mejor valoración"]
            this.yAxis.labelString = "Número de valoraciones"
            for (let i = 0; i < data.content.length; i++){
              let itinerary = data.content[i];
              this.barChartData.push({ data: [itinerary.avgRating], label: itinerary.name })
            }

            if (this.barChartData.length == 0) {this.messageError = "No hay datos según el criterio de busqueda introducido."}
          }
        );

        break;
      case "UltimosItinerariosMasComentarios":
        this.dashboardService.ultimosItinerariosOrdenadosPorComentarios(country,city).subscribe(
          data => {
            this.barChartLabels = ["Últimos itinerarios con más comentarios"]
            this.yAxis.labelString = "Número de comentarios"
            for (let i = 0; i < data.content.length; i++){
              let itinerary = data.content[i];
              this.barChartData.push({ data: [itinerary.countComments], label: itinerary.name })
            }

            if (this.barChartData.length == 0) {this.messageError = "No hay datos según el criterio de busqueda introducido."}
          }
        );

        break;
    }
  }
  

  OnChange(pais:string) {
    if (pais) {
      this.dashboardService.getCityByCountry(pais).subscribe(c => {this.city = c; this.formFilter.controls['city'].setValue('');} )
    } else {
        this.city = []
        this.formFilter.controls['city'].setValue('')
    }
  }

}