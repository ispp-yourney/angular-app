
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {environment} from '../../../environments/environment-ci';
declare var H: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit {

    @ViewChild("map")
    public mapElement: ElementRef;

    
    private _apikey: any=environment.hereApiKey;

    

    @Input()
    public lat: any;

    @Input()
    public lng: any;

    @Input()
    public width: any;

    @Input()
    public height: any;

    public constructor() { }

    public ngOnInit() { }

    public ngAfterViewInit() {

        var LocationOfMarker = { lat: this.lat, lng: this.lng };
        // Create a marker icon from an image URL:
        var icon = new H.map.Icon('path of marker img');

        // Create a marker using the previously instantiated icon:
        var marker = new H.map.Marker(LocationOfMarker, { icon: icon });

        let platform = new H.service.Platform({
            "apikey": this._apikey
        });
        let defaultLayers = platform.createDefaultLayers();
        let map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.vector.normal.map,
            {
                zoom: 15,
                center: { lat: this.lat, lng: this.lng },
                marker: marker
            }
        );

        // Add the marker to the map:
        var markerSite = new H.map.Marker({lat: this.lat, lng: this.lng})
        map.addObject(markerSite)

        // Add UI interface: ZOOM +/-
        var ui = H.ui.UI.createDefault(map, defaultLayers);
    }

}