import { Component, OnInit } from "@angular/core";
import { ApiService } from "@app/core/services";
import { Subscription } from "rxjs";
import { DataModel, Planet } from "@app/core/models";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    public _service: ApiService,
    private router: Router,
    public route: ActivatedRoute
  ) {}
  sizes: number[] = [5, 10, 25, 100];
  nextSearchUtl: string;
  prvSearchUtl: string;
  isSearch: boolean;
  isEmpty: boolean = false;
  isError: boolean = false;
  subscription?: Subscription;
  list: Planet[] = [];
  data: Planet[] = [];
  showSpinner: boolean = true;
  numberOfPlanetsPages: number;
  currentPageSize: number = 10;
  currentPage: number = 1;
  numberOfPageToShow: number;
  typeOfResult: string = "allPlanets";
  page: number = 0;

  getPlanets(page: number, next?: string) {
    this.typeOfResult = "allPlanets";
    this.showSpinner = true;
    this.isError, this.isEmpty, (this.isSearch = false);
    this.subscription = this._service.getPlanets(page, next).subscribe(
      data => {
        this.handelSuccessResponse(data);
      },
      e => {
        this.handelErrorResponse(e);
      }
    );
  }

  handelSuccessResponse(data: DataModel) {
    if (this.currentPageSize === 25) {
      this.page++;
      let resultsOnSize = Math.ceil(this.currentPageSize / 10);
      let step = Math.floor(this.currentPageSize / 10) * (this.currentPage - 1);
      let limit = step + resultsOnSize;
      if (data.next && this.page <= limit)
        this.getPlanets(this.currentPage, data.next);   
    }

    this.numberOfPlanetsPages = Math.ceil(data.count / 10);
    if (data.results.length > 0) {
      this.list = [...this.list, ...data.results];
    } else {
      this.isEmpty = true;
    }
    this.showSpinner = false;
    this.data = this.list;
    localStorage.setItem("cache", JSON.stringify(this.data));
  }

  handelErrorResponse(error) {
    this.showSpinner = false;
    this.isError = true;
  }

  getDataFromSearch(val, next?) {
    if (val === "") {
      this.isEmpty = false;
      this.typeOfResult = "allPlanets";
    } else {
      this.typeOfResult = "search";
    }
    this.isSearch = true;
    this.showSpinner = true;
    this.subscription.unsubscribe();
    this.subscription = this._service.searchPlanet(val, next).subscribe(
      data => {
        this.prvSearchUtl = data.previous;
        this.nextSearchUtl = data.next;
        this.list = [];
        this.handelSuccessResponse(data);
      },
      e => {
        this.handelErrorResponse(e);
      },
      () => {}
    );
  }

  searchTermChange(term) {
    this.getDataFromSearch(term);
  }

  paginationUp() {
    if (this.isSearch) {
      if (this.nextSearchUtl) this.getDataFromSearch("", this.nextSearchUtl);
      return;
    }
    if (this.currentPage < this.numberOfPlanetsPages) {
      this.currentPage++;
      this.router.navigate(["/", this.currentPage, this.currentPageSize]);
    }
  }
  paginationDown() {
    if (this.isSearch) {
      if (this.prvSearchUtl) this.getDataFromSearch("", this.prvSearchUtl);
      return;
    }
    if (this.currentPage  > 1) {
      this.currentPage--;
      this.router.navigate(["/", this.currentPage, this.currentPageSize]);
    }
  }

  changeResultsSize(target) {
    this.currentPage = 1;
    this.currentPageSize = target;
    this.router.navigate(["/", this.currentPage, this.currentPageSize]);
  }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("cache")) || [];
    this.route.paramMap.subscribe(params => {
      this.list = [];
      if (params.get("page")) {
        let page = params.get("page");
        let size = params.get("size");
        this.currentPageSize = Number(size);
        this.currentPage = Number(page);
        let resultsOnSize = Number(size) / 10;
        let pageNumber = Math.ceil(resultsOnSize * Number(page));
        if (this.currentPageSize === 100) {
          for (let i = this.currentPage; i <= resultsOnSize; i++) {
            if (i <= 7) {
              this.getPlanets(i);
            }
          }
        } else if (this.currentPageSize === 25) {
          this.page = this.currentPage === 1 ? 1 : this.currentPage === 2 ? 3 : 6;
          this.getPlanets(this.page);
        } else {
          this.getPlanets(pageNumber);
        }
      } else {
        this.getPlanets(this.currentPage);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
