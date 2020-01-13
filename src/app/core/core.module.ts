import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import {
  ApiService
} from './services';
import {
  ApiHttp,
    ApiMock
  

} from './http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
      ApiMock,
      
   // { provide: ApiService, useClass: ApiMock },
    { provide: ApiService, useClass: ApiHttp }
  ],
  declarations: [
  ],
  entryComponents: [
  ],
  exports: [
    CommonModule,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      // Import guard
      if (parentModule) {
          throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
      }
  }
}
