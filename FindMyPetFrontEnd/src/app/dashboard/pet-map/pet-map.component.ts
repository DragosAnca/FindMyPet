import { ResourceLoader } from '@angular/compiler';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Form } from 'src/app/@core/models/form';
import { Marker } from 'src/app/@core/models/marker'
import { Loader } from '@googlemaps/js-api-loader';
import { FormCollectionService } from 'src/app/@core/services/form-collection.service';



@Component({
  selector: 'app-pet-map',
  templateUrl: './pet-map.component.html',
  styleUrls: ['./pet-map.component.css']
})
export class PetMapComponent implements OnInit {

  formList: Form[] = [];
  form!: Form;

  markerList: Marker[] = [];



  constructor(private formCollectionService:FormCollectionService) {
    this.formCollectionService.getAll().subscribe(data => {
      this.formList = data
      });

  }

 myLatlng: google.maps.LatLng = new google.maps.LatLng(-25.363882,131.044922);
 mapOptions = {
   zoom: 4,
   center: this.myLatlng
 }
map: google.maps.Map = new google.maps.Map(document.getElementById("map")!, this.mapOptions);

marker: google.maps.Marker = new google.maps.Marker({
     position: this.myLatlng,
     title:"Hello World!"
 });



  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyDK_j5J4mn0O15yftYyrA3f0qAVVwdKhzs'
    })

    loader.load().then(() => {
      new google.maps.Map(document.getElementById("map") as HTMLElement,{
        center: { lat: 45.438221, lng: 28.056339},
        zoom: 12
      })
    })

    this.marker.setMap(this.map);

 }

 // To add the marker to the map, call setMap();

}
