import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './product-form/product-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsComponent } from './../product-module/products/products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  declarations: [
    ProductsComponent,
    ProductFormComponent],
  providers:[NgbActiveModal],
  exports: [
    ProductsComponent,
    ProductFormComponent]
})
export class ProductModuleModule { }
