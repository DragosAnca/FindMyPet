import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { Coordinates } from 'src/app/@core/models/coordinates';
import { Form } from 'src/app/@core/models/form';
import { FormCollectionService } from 'src/app/@core/services/form-collection.service';
import { LocalStorageService } from 'src/app/@core/services/local-storage-service.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {

  location: string;
  @Input() coordinates = new Coordinates;

  myImage!: Observable<any>;

  base64code!: any;

  onChange =($event: Event) => {
    const target = $event.target as HTMLInputElement;

    const file: File = (target.files as FileList)[0];

    console.log(file)
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) =>{
      this.readFile(file, subscriber)
    })

    observable.subscribe((data) => {
      this.base64code = data;
    })
  }

  readFile(file: File, subscriber: Subscriber<any>){
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      subscriber.next(fileReader.result);

      subscriber.complete();
    }

    fileReader.onerror = () => {
      subscriber.error();

      subscriber.complete();
    }


  }

  petForm = new FormGroup ({

    lostOrFoundPet :new FormControl(''),
    species: new FormControl(''),
    breed: new FormControl(''),
    name: new FormControl(''),
    accessories: new FormControl(''),
    color: new FormControl(''),
    sized: new FormControl(''),
    chip: new FormControl(''),
    marks: new FormControl(''),
    pic: new FormControl(''),

    //TODO make the on click event to update the location with lat, lng
    emailContact: new FormControl(''),
    phone: new FormControl(''),
  })

  constructor(
    private formCollectionService: FormCollectionService,
    private localStorageService: LocalStorageService
    ) {

  }

  ngOnInit(): void {
  }

  onSubmit(){


    console.warn(this.coordinates.lat +"lat<-"+this.coordinates.lng+"<-lng" +"coordinates")

    var form: Form = {...this.petForm.value}
    console.warn(this.petForm.value);

    form.lat = "";
    form.lat += this.coordinates.lat;

    console.warn("form.lat =" + form.lat + "coordinates.lat= "+this.coordinates.lat)
    form.lng = "";
    form.lng += this.coordinates.lng;

    form.username = this.localStorageService.get("email");
    console.warn("form.username", form.username);

    form.pic = this.base64code;
    console.log(form.pic);

    this.formCollectionService.createForm(form);

  }

}
