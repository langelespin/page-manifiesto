import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'mapa',
    component: MapComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
