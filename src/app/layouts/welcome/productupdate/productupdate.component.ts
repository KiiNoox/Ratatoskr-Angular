import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductCategory} from 'src/app/core/models/Products';
import { Currency } from 'src/app/core/models/Products';
import { Products } from 'src/app/core/models/Products';
import { currentUser } from 'src/app/core/models/currentUser';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-productupdate',
  templateUrl: './productupdate.component.html',
  styleUrls: ['./productupdate.component.css']
})
export class ProductupdateComponent implements OnInit {
  form!: FormGroup;
  categories: string[] = Object.values(ProductCategory);
  product: Products;
  //Currencies:string[]= Object.values(Currency)
  prod: Products = new Products();
  isUpdate = false;
  currentUser?: currentUser;
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router, private route: ActivatedRoute,private userService:UserService) {
  }

  ngOnInit(): void {
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
    console.log(Currency.TND);
    this.userService.GetInfo(this.userService.GetEmailFromToken()).then(data => {
      this.currentUser = data;
      console.log(data);
    });
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.productService.getProductById(+id)
        .subscribe(product => this.product = product);
    }
    if (this.productService.selectedProduct) {
      this.product = Object.assign({}, this.productService.selectedProduct);
      this.isUpdate = true;
    }
  }
  onFileChange(event: { target: { files: string | any[]; }; }) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        file: file
      });
    }
  }
  /*onSubmit() {
    this.productService.updateProd(this.product).subscribe(() => {
      setTimeout(() => {
        this.router.navigate(['/welcome/products']);
      }, 3000);
    });
  }*/
  onSubmit() {
console.log(this.currentUser);

      // Update existing product
      this.productService.updateProducts(this.product)
        .subscribe((product) => {
          console.log(product);
          setTimeout(() => {
            this.router.navigate(['/welcome/products']);
          }, 3000);
        });


}}
