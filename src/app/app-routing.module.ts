import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetDetailsComponent } from "./pages/planet-details/planet-details.component";
import { AppComponent } from './app.component'


import { HomeComponent } from "./shared/components/home/home.component";


const routes: Routes = [
  {
        path: "",
        component : HomeComponent,
         pathMatch: 'full'
  },
  {
      path: 'details/:id',
      loadChildren: './pages/planet-details/planet.module#PlanetPageModule',
    },
    {
        path: ':page/:size',
        component: HomeComponent,
        pathMatch: 'full'
    }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
