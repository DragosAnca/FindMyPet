import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from 'src/app/@core/models/form';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';
import { FormCollectionService } from 'src/app/@core/services/form-collection.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userFormList: Form[] =[];
  public deleteForm!: FormGroup;

  constructor(private formService: FormCollectionService,
    private authService: AuthenticationService
    ) { }

  ngOnInit(): void {

    this.formService.getByUsername(this.authService.getInfo()).subscribe(x => this.userFormList = x);
    this.deleteForm = new FormGroup({
      deleteName: new FormControl('')
    })
  }

  public onRemoveFormButtonClick(){
    console.log("button remove clicked")
    console.log()
    this.userFormList.forEach((x, index) => {
      if(x.name == this.deleteForm.value.deleteName as string){
        this.formService.deleteById(x.id).subscribe(x => console.log(x.id));
        this.userFormList.splice(index, 1);
      }
    })
  }



}
