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
import { PetListEntryComponent } from './pet-map/pet-list-entry/pet-list-entry.component';
import { PetListComponent } from './pet-map/pet-list/pet-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

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
    PetListComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatCardModule
  ],
  bootstrap: [DashboardModule]
})
export class DashboardModule { }
