import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PlanetDetailsComponent } from "./planet-details.component";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [PlanetDetailsComponent],
  imports: [
    CommonModule,
    MatButtonModule,

    RouterModule.forChild([
      {
        path: "",
        component: PlanetDetailsComponent
      }
    ])
  ]
})
export class PlanetPageModule {}
