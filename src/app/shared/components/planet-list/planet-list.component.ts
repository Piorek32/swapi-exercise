import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { Planet } from "@app/core/models/models";
import { Router } from "@angular/router";

@Component({
  selector: "app-planet-list",
  templateUrl: "./planet-list.component.html",
  styleUrls: ["./planet-list.component.css"]
})
export class PlanetListComponent implements OnChanges {
  @Input("planetList")
  list!: Planet[];
  @Output("searchTerm")
  searchTerm = new EventEmitter();
  @Input("currentPage") currentPage: number;
  @Input("pageSize") pageSize: number;

 showSpinner: boolean;
  constructor(private router: Router) {}

  displayedColumns: string[] = ["name"];
  dataSource: Planet[];

  numberOfPages: number;
  start: number;
  end: number;

  ngOnChanges(changes: SimpleChanges) {
   
    if (changes.list) { 
      this.showSpinner = true;
     
      if (this.pageSize === 5) {
        if (this.currentPage % 2 !== 0) {
          this.start = this.pageSize;
          this.end = this.pageSize * 2;
        } else {
          this.start = 0;
          this.end = this.pageSize;
        }
      }
      if (this.pageSize === 25) {
        if (this.currentPage % 2 === 0) {
          this.start = 5;
          this.end = this.pageSize + 5;
        } else {
          this.start = 0;
          this.end = this.pageSize;
        }
      }
      this.dataSource = this.list.slice(this.start, this.end);
      this.showSpinner = false;
      
    }
  }

  applyFilter(filterValue: string) {
    this.searchTerm.emit(filterValue);
  }

  planetDetails(planet) {
    let url: string = planet.url;
    let arrayFromUrl = url.split("/");
    let param = arrayFromUrl.slice(
      arrayFromUrl.length - 2,
      arrayFromUrl.length - 1
    );
    this.router.navigate(["/details", param.join("")]);
  }
}
