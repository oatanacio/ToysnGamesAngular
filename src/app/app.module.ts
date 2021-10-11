import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductModuleModule } from './product-module/product-module.module';


@NgModule({
  declarations: [	
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ProductModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
