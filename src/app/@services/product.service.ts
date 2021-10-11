
import { Product } from './../@models/product';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private refresh = new Subject<any>();
  public products: Product[] = [];
  baseUrl = "https://localhost:44372/api/";

  constructor(private http: HttpClient) {
  }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getAllProducts(url: string): void {
    this.getProducts(url).subscribe(response => {
      this.products = response
    },
      error => {
        this.products = []
      });
  }

  getProduct(url: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}${url}`);
  }

  getProducts(url: string): Observable<Product[]> {
    return this.http.get<Product[]>(url);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}Products`, product, this.httpHeader).pipe(
      tap(()=>{
        this.refresh.next();
      })
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}Products`, product).pipe(
      tap(()=>{
        this.refresh.next();
      })
    );
  }

  deleteProduct(url: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}${url}`).pipe(
      tap(() => {
        this.refresh.next();
      })
    );
  }

  get refreshData() {
    return this.refresh;
  }

}
