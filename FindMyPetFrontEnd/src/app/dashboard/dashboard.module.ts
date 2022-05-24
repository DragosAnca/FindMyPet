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
import { PetFormComponent } from './pet-form/pet-form.component';
import { PetListEntryComponent } from './pet-list-entry/pet-list-entry.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

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
  ],
  bootstrap: [DashboardModule]
})
export class DashboardModule { }
