import { ResourceLoader } from '@angular/compiler';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Form } from 'src/app/@core/models/form';

import { Loader } from '@googlemaps/js-api-loader';
import { FormCollectionService } from 'src/app/@core/services/form-collection.service';
import { styles } from './map-styles';
import { Marker } from 'src/app/@core/models/marker';



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

  ngOnInit(): void {
    // let loader = new Loader({
    //   apiKey: 'AIzaSyDK_j5J4mn0O15yftYyrA3f0qAVVwdKhzs'
    // })

    // loader.load().then(() => {
    //   new google.maps.Map(document.getElementById("map") as HTMLElement,{
    //     center: { lat: 45.438221, lng: 28.056339},
    //     zoom: 12
    //   })
    // })

    //load the google map on the browser

    let loader = new Loader({
      apiKey: 'AIzaSyDK_j5J4mn0O15yftYyrA3f0qAVVwdKhzs'
    });

    loader.load().then(() => {

      const location = {
        lat: 45.438221,
        lng: 28.056339,
      };

      this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: location,
        zoom: 12,
        styles: styles,
      })

      //marker

      // const marker = new google.maps.Marker({
      //   position: location,
      //   map: this.map,
      // })

      this.formList.forEach(x => {
        const mark = new Marker(x.lat, x.lng)
        this.markerList.push(mark)
      })

      console.log(this.markerList)

      this.markerList.forEach(location => {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.lat, location.lng),
          map: this.map
        });
        console.log(marker)
      });


    })

 }


 title = "google-maps"

 private map!: google.maps.Map

//  public createMarkerFromForm(form: Form): void{
//   const location ={
//     lat: form.lat,
//     lng: form.lng,
//   }
//   console.log("location marker works")
//   this.markerList.push( new google.maps.Marker({
//     position: location,
//     map: this.map,
//   }))

//   console.log("marker push works")
//  }
}
