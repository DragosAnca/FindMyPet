import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationComponent } from './authentication.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthenticationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    AuthenticationRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule

  ],

  bootstrap: [AuthenticationModule],
})

export class AuthenticationModule { }
