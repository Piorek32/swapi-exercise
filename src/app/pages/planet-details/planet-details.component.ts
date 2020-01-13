import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Planet } from '@app/core/models'
import { ApiService } from '@app/core/services'
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public _service: ApiService,
    private router: Router
  ) {
  }

  subscription?: Subscription;
  planetId: string;
  planet: Planet;
  showSpinner: boolean;
  isError: boolean = false;

  

  handelErrorResponse(error) {
    this.showSpinner = false;
    this.isError = true;

  }

  ngOnInit() {
    this.isError = false;
    this.route.paramMap.subscribe(params => {
      this.showSpinner = true;
      this.planetId = params.get('id');
      this.subscription = this._service.getPlanet(this.planetId).subscribe(
          (planet) => { 
          this.planet = planet;
        },
        (err) => this.handelErrorResponse(err),
        () => this.showSpinner = false
      );
    });
  }


    goBack() {
        this.router.navigate(['/']);
    }

   ngOnDestroy() {
    this.subscription.unsubscribe();

  }

}
