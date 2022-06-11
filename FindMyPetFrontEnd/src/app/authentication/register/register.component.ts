import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/@core/models/user';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public register(): void{
    const user: User = {...this.registerForm.value};

    //TODO Add empty array of user forms in server db and front
    this.authenticationService.register(user);

    this.router.navigate(['auth/login']);
  }

}
