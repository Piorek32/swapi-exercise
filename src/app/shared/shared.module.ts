import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button'



import {
    PlanetListComponent,
    HomeComponent
  

} from './components';


@NgModule({
    imports: [
        CommonModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule
    
  ],
  declarations: [
      PlanetListComponent,
      HomeComponent
  
  ],
  entryComponents: [
      PlanetListComponent,
      HomeComponent
   
  ],
    exports: [
      CommonModule,
      PlanetListComponent,
      HomeComponent
   
  ]
})


export class SharedModule { }
