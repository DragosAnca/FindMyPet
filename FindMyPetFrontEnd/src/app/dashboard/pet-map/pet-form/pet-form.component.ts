import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Coordinates } from 'src/app/@core/models/coordinates';
import { Form } from 'src/app/@core/models/form';
import { FormCollectionService } from 'src/app/@core/services/form-collection.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {

  location: string;
  @Input() coordinates = new Coordinates;

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
    username: new FormControl(''),
  })

  constructor(private formCollectionService: FormCollectionService ) {

  }

  ngOnInit(): void {
  }

  onSubmit(){


    console.warn(this.coordinates.lat +"lat<-"+this.coordinates.lng+"<-lng" +"coordinates")
    // console.warn("location on submit" + this.location)
    // const lat = this.location.split(' ,  ', 7)[0] as unknown as number;
    // const lng = this.location.split(' ,  ', 7)[1] as unknown as number;
    // console.warn(lat+'=lat' + lng+'=lng')
    // const newform = new Form(
    //   this.petForm.value.lostOrFoundPet,
    //   this.petForm.value.species,
    //   this.petForm.value.breed,
    //   this.petForm.value.name,
    //   this.petForm.value.accesories,
    //   this.petForm.value.color,
    //   this.petForm.value.sized,
    //   this.petForm.value.chip,
    //   this.petForm.value.marks,
    //   this.petForm.value.pic,
    //   {lat: lat, lng: lng},
    //   '',
    //   '',
    //   ''
    // )
    var form: Form = {...this.petForm.value}
    console.warn(this.petForm.value);
    // form.lat = this.location.split(' ,  ', 7)[0] as unknown as number ;
    // console.warn(form.lat);
    // form.lng = this.location.split(' ,  ', 7)[1] as unknown as number;
    // console.log(form.lng)


    form.lat = "";
    form.lat += this.coordinates.lat;

    console.warn("form.lat =" + form.lat + "coordinates.lat= "+this.coordinates.lat)
    form.lng = "";
    form.lng += this.coordinates.lng;
    this.formCollectionService.createForm(form)

  }

}
