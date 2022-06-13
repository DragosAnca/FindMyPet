import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordEmail = new FormControl('');
  email: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }
  public forgot(): void{
    this.email = this.forgotPasswordEmail.value;
    this.authService.sendPasswordByEmail(this.email);
    console.log(this.email);
  }

}
