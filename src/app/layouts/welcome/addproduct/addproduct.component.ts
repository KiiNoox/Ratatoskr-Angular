import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductCategory } from 'src/app/core/models/Products';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  form!: FormGroup;
  categories: string[] = Object.values(ProductCategory);

  name = ""
  description = ""
  price = 0
  address = ""
  region = ""
  available = true
  numberOfStock = 0
  category = ""
  file !: File

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      address: ['', Validators.required],
      region: ['', Validators.required],
      available: ['', Validators.required],
      numberOfStock: ['', Validators.required],
      category: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  onFileChange(event: { target: { files: string | any[]; }; }) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        file: file
      });
    }
  }

  onSubmit() {
    const formData = this.form.value;

    this.productService.addProduct(this.name, this.description, this.price, this.address, this.region, this.available, this.numberOfStock, this.category, this.file)
      .subscribe(() => {
        this.router.navigateByUrl('/welcome/products');
      });
  }
  Cancel(){
    this.router.navigateByUrl('/welcome/products');
  }

}
