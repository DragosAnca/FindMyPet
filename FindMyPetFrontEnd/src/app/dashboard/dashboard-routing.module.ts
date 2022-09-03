import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '../@core/guards/session.guard';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PetMapComponent } from './pet-map/pet-map.component';
import { ProfileComponent } from './profile/profile.component';
import { TipsComponent } from './tips/tips.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'petmap', component: PetMapComponent},
    { path: 'tips', component: TipsComponent},
    { path: 'about', component: AboutComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [SessionGuard]}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
