import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './../../@services/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() public product_Id: number;
  form = new FormGroup({
    product_Id: new FormControl(0),
    name: new FormControl('', Validators.required),
    description: new FormControl('',),
    ageRestriction: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });

  editForm: boolean = false;
  constructor(private productService: ProductService, public modal: NgbActiveModal) {
    this.product_Id = 0;
  }

  ngOnInit() {
    if (this.product_Id > 0) {
      this.editForm = true;
      this.fillForm(this.product_Id );
    }
  }

  fillForm(id:number):void{
    this.productService.getProduct(`Products/${id}`).subscribe(response => {
      console.log('fillForm',response);
      this.form.setValue(response);
    }, error => {
      console.log(error);
    })
  }

  onSubmit(): void {
    if (!this.editForm) {
      this.productService.addProduct(this.form.value).subscribe(response => {
        Swal.fire(
          'Saved!',
          'Your file has been saved.',
          'success'
        )
        this.modal.close();
      }, error => {
        console.log(error);
      })
    } else {
      this.productService.updateProduct(this.form.value).subscribe(response => {
        Swal.fire(
          'Updated!',
          'Your file has been updated.',
          'success'
        )
        this.modal.close();
      }, error => {
        console.log(error);
      })
    }
  }

}
