import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Form } from 'src/app/@core/models/form';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';
import { FormCollectionService } from 'src/app/@core/services/form-collection.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private formService: FormCollectionService,
    private authService: AuthenticationService
    ) { }

  userFormList: Form[] =[]

  ngOnInit(): void {

    this.formService.getByUsername(this.authService.getInfo()).subscribe(x => this.userFormList = x);
  }

}
