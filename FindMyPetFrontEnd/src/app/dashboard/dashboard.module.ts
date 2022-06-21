import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AboutComponent } from './about/about.component';
import { PetMapComponent } from './pet-map/pet-map.component';
import { TipsComponent } from './tips/tips.component';
import { PetFormComponent } from './pet-map/pet-form/pet-form.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { PetListEntryComponent } from './pet-map/pet-list-entry/pet-list-entry.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProfileComponent } from './profile/profile.component';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    PetMapComponent,
    TipsComponent,
    PetFormComponent,
    PetListEntryComponent,
    PetMapComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule

  ],

  bootstrap: [DashboardModule]
})
export class DashboardModule { }
