import { ProductFormComponent } from './../product-form/product-form.component';
import { Product } from '../../@models/product';
import { ProductService } from '../../@services/product.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService,
    private modalService: NgbModal) {
    this.products = [];
    this.subscription = this.productService.refreshData.subscribe(() => {
      this.getProducts();
    });
  }

  ngOnInit(): void {
    this.getProducts();

  }

  getProducts(): void {
    this.productService.getProducts(`Products`).subscribe(response => {
      this.products = response;
    })
  }

  open(): void {
    this.modalService.open(ProductFormComponent, { ariaLabelledBy: 'modal-basic-title' });
  }

  deleteProduct(id: number): void {
    Swal.fire({
      title: 'Do you want to delete this product?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(`Products/${id}`).subscribe(response => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    })
  }

  updateProduct(product_Id: number): void {
    const modalRef = this.modalService.open(ProductFormComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.product_Id = product_Id;
  }

}
