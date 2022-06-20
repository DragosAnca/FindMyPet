import { ResourceLoader } from '@angular/compiler';
import { Component, Input, OnInit, Output, Sanitizer, ViewChild } from '@angular/core';
import { Form } from 'src/app/@core/models/form';

import { Loader } from '@googlemaps/js-api-loader';
import { FormCollectionService } from 'src/app/@core/services/form-collection.service';
import { styles } from './map-styles';
import { Coordinates } from 'src/app/@core/models/coordinates';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';



@Component({
  selector: 'app-pet-map',
  templateUrl: './pet-map.component.html',
  styleUrls: ['./pet-map.component.css']
})
export class PetMapComponent implements OnInit {

  formList: Form[] = [];
  lostFormList: Form[] = [];
  foundFormList: Form[] = [];



  showLostFormList: boolean = false;
  showFoundFormList: boolean = false;
  showSelectedFormFromMark: boolean = false;

  googleMarkerList: google.maps.Marker [] = [];
  lostGoogleMarkerList: google.maps.Marker [] = [];
  foundGoogleMarkerList: google.maps.Marker [] = [];

  showForm: boolean=false;

  form!: Form;

  selectedFormFromMark!: Form;

  // infoWindow:google.maps.InfoWindow;


  private map!: google.maps.Map

  coordinatesFromMapClick: Coordinates = new Coordinates;


  constructor(private formCollectionService:FormCollectionService,
     private authService: AuthenticationService,
     ) {
  }

  ngOnInit(): void {



    //load the google map on the browser

    let loader = new Loader({
      apiKey: 'AIzaSyDK_j5J4mn0O15yftYyrA3f0qAVVwdKhzs',
      libraries: ['places']
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

            const mark = new google.maps.Marker({
              position: new google.maps.LatLng(x.lat as unknown as number, x.lng as unknown as number),
              map: this.map

            })
            // Add a click listener for each marker, and set up the info window.
            this.addMarkerAndFormCardListener(mark, x, infoWindow);

            this.googleMarkerList.push(mark);
            this.lostGoogleMarkerList.push(mark);

            this.lostFormList.push(x);

          }

          else{

            const mark = new google.maps.Marker({
              position: new google.maps.LatLng(x.lat as unknown as number, x.lng as unknown as number),
              map: this.map
            })
            // Add a click listener for each marker, and set up the info window.
            // mark.addListener("click", () => {

            //   infoWindow.close();
            //   infoWindow.setContent(x.name);
            //   infoWindow.open(mark.getMap(), mark);
            // });
            this.addMarkerAndFormCardListener(mark, x, infoWindow);

            this.googleMarkerList.push(mark);
            this.foundGoogleMarkerList.push(mark);


            this.foundFormList.push(x);


          }




        })


        // this.createMarkerList();
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
      //Creating the Search Box
      const input = document.getElementById("pac-input") as HTMLInputElement;
      const searchBox = new google.maps.places.SearchBox(input);

      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      this.map.addListener("bounds_changed", () => {
        searchBox.setBounds(this.map.getBounds() as google.maps.LatLngBounds);
        });
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }


        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          const icon = {
            url: place.icon as string,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          };

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        this.map.fitBounds(bounds);
      });




    })

  //Show Form if user is logged in
  if(!this.authService.isAuthenticated()){
    this.showForm = false;
  }
  else{
    this.showForm = true;
  }


}


// public createMarkerList(){

//   this.markerList.forEach(location => {
//     var marker = new google.maps.Marker({
//       position: new google.maps.LatLng(location.lat, location.lng),
//       map: this.map
//     });
//     console.log(marker)
//   })
// }



public hideLostMarkersFromMarkerList(){
  this.lostGoogleMarkerList.forEach(x =>{
    x.setMap(null);
  })
  this.foundGoogleMarkerList.forEach(x =>{
    x.setMap(this.map);
  })
  this.showSelectedFormFromMark = false;
  this.showLostFormList=false;
  this.showFoundFormList=true;
}

public hideFoundMarkersFromMarkerList(){
  this.foundGoogleMarkerList.forEach(x =>{
    x.setMap(null);
  })
  this.lostGoogleMarkerList.forEach(x =>{
    x.setMap(this.map);
  })

  console.warn("hide marks works")
  this.showSelectedFormFromMark = false;
  this.showFoundFormList=false;
  this.showLostFormList=true;

}

public onFormCardClick(form: Form){
  this.foundGoogleMarkerList.forEach(x =>{
    x.setMap(null);
  })
  this.lostGoogleMarkerList.forEach(x =>{
    x.setMap(null);
  })
}

public addMarkerAndFormCardListener(googleMarker: google.maps.Marker, form: Form, infoWindow:google.maps.InfoWindow){

    googleMarker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(form.name);
      infoWindow.open(googleMarker.getMap(), googleMarker);

      this.showFoundFormList = false;
      this.showLostFormList = false;
      this.showSelectedFormFromMark = true;

      this.selectedFormFromMark = form;
  })
}




}
