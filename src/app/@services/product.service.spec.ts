import { Product } from './../@models/product';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ProductService } from './product.service';


describe('ProductService', () => {
  let productsService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    productsService = TestBed.get(ProductService);
    httpTestingController = TestBed.get(HttpTestingController);
  })

  beforeEach(() => {
    productsService = TestBed.get(ProductService);
    httpTestingController = TestBed.get(HttpTestingController);
  })

  it('should return expected products', () => {
    const testModel: Product[] = [
      {
        "product_Id": 19,
        "name": "Nicky Guadalupe",
        "description": "Super Kittens",
        "ageRestriction": 99,
        "company": "Super Cats",
        "price": 999
      },
      {
        "product_Id": 10,
        "name": "string",
        "description": "string",
        "ageRestriction": 0,
        "company": "string",
        "price": 1
      }
    ]
    productsService.getProducts(`Products`).subscribe(response => {
      expect(testModel).toBe(response, 'Check data');
    })

    const req = httpTestingController.expectOne(`Products`);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(testModel);
    httpTestingController.verify();
  });

  it('should return add post model', (done) => {
    const newPost = {
      "product_Id": 10,
      "name": "Nicky Guadalupe2",
      "description": "Super Kittens2",
      "ageRestriction": 991,
      "company": "Super Cats2",
      "price": 99
    };

    productsService.addProduct(newPost).subscribe(added => {
      console.log('return', added);
      expect(added).toBe(newPost, 'Check data');
      done();
    })

    const req = httpTestingController.expectOne('https://localhost:44372/api/Products');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(newPost);
    httpTestingController.verify();

  });

  it('should return update model', (done) => {
    const newPost = {
      "product_Id": 9,
      "name": "Nicky Guadalupe2",
      "description": "Super Kittens2",
      "ageRestriction": 991,
      "company": "Super Cats2",
      "price": 99
    };

    productsService.updateProduct(newPost).subscribe(added => {
      console.log('return', added);
      expect(added).toBe(newPost, 'Check data');
      done();
    })

    const req = httpTestingController.expectOne('https://localhost:44372/api/Products');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(newPost);
    httpTestingController.verify();

  });

});
