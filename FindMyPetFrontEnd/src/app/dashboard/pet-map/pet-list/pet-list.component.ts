import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { Form } from 'src/app/@core/models/form';
import { FormCollectionService } from 'src/app/@core/services/form-collection.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent {

  formList: Form[] = [];
  searchedForm: Form = new Form();
  searchId: string = '';
  searchName: string = '';
  subscriptions: Subscription[] = [];
  constructor(private formCollectionService:FormCollectionService) {
    this.formCollectionService.getAll().subscribe(data => {
      this.formList = data;
      }
    )

  }

  public onSearchClickById(){
    console.log(this.searchId);
    this.subscriptions.push(this.formCollectionService.getById(this.searchId).subscribe(data => {
       this.searchedForm = data;
      console.log(this.searchedForm.name);
     })
     )
  }

  public onSearchClickByName(){
    console.log(this.searchName);
    this.subscriptions.push(this.formCollectionService.getByName(this.searchName).subscribe(data => {
       this.searchedForm = data;
      console.log(this.searchedForm.name);
     })
     )
  }

  ngOnFinalize(): void{
      this.subscriptions.forEach(x => x.unsubscribe())
  }
}