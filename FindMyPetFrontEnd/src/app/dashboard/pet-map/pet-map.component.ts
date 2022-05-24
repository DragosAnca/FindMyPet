import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';


@Component({
  selector: 'app-pet-map',
  templateUrl: './pet-map.component.html',
  styleUrls: ['./pet-map.component.css']
})
export class PetMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyDK_j5J4mn0O15yftYyrA3f0qAVVwdKhzs'
    })
    
    loader.load().then(() => {
      new google.maps.Map(document.getElementById("map") as HTMLElement,{
        center: { lat: 0, lng: 0},
        zoom: 6
      })
    })
 }

}
