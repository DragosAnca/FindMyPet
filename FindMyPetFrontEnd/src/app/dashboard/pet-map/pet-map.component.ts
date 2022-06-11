import { ResourceLoader } from '@angular/compiler';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Form } from 'src/app/@core/models/form';

import { Loader } from '@googlemaps/js-api-loader';
import { FormCollectionService } from 'src/app/@core/services/form-collection.service';
import { styles } from './map-styles';
import { Marker } from 'src/app/@core/models/marker';
import { Coordinates } from 'src/app/@core/models/coordinates';



@Component({
  selector: 'app-pet-map',
  templateUrl: './pet-map.component.html',
  styleUrls: ['./pet-map.component.css']
})
export class PetMapComponent implements OnInit {

  formList: Form[] = [];
  lostFormList: Form[] = [];
  foundFormList: Form[] = [];

  form!: Form;

  title = "google-maps"

  private map!: google.maps.Map

  markerList: Marker[] = [];
  lostMarkerList: Marker[] = [];
  foundMarkerList: Marker[] = [];

  coordinatesFromMapClick: Coordinates = new Coordinates;




  constructor(private formCollectionService:FormCollectionService) {




  }

  ngOnInit(): void {

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

      this.formCollectionService.getAll().subscribe(data => {

        this.formList = data
        this.formList.forEach(x =>{
          //Creatin the lost and found pet lists and markers
          if(x.lostOrFoundPet == "lost"){

            const mark = new Marker(x.lat as unknown as number, x.lng as unknown as number);
            this.lostMarkerList.push(mark);
            this.lostFormList.push(x);
          }
          else{
            const mark = new Marker(x.lat as unknown as number, x.lng as unknown as number);
            this.foundMarkerList.push(mark);
            this.foundFormList.push(x);
          }
        })


        console.log(this.markerList)

        this.createMarkerList(this.lostMarkerList);
        ///Create event to show only lost or found marker list
        });

        //Configure the click listener
        let infoWindow = new google.maps.InfoWindow({
          content: "Click where the pet was last time seen",
          position: {
            lat: 45.438221,
            lng: 28.056339,
          }
        });



        infoWindow.open(this.map);
         // Configure the click listener.
        this.map.addListener("click", (mapsMouseEvent) => {

        // Close the current InfoWindow.
        infoWindow.close();

        JSON.parse(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2), (key, value) =>{
        typeof value === 'number'
        if(key == "lat") this.coordinatesFromMapClick.lat = value
        if(key == "lng")this.coordinatesFromMapClick.lng = value
        });
        console.warn(this.coordinatesFromMapClick.lat+"<-lat" +this.coordinatesFromMapClick.lng+'<-lng' + "coordinates from map click")
        // this.coordinatesFromMapClick.lng = mapsMouseEvent.lng.toJSON();


        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });

        infoWindow.setContent(
          "Last seen pet"
        );
        infoWindow.open(this.map);

      });

    })



}


private createMarkerList(markerList: Marker[]){
  markerList.forEach(location => {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.lat, location.lng),
      map: this.map
    });
    console.log(marker)
  })
}








}
