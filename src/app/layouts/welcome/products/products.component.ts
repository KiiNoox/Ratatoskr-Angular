import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/core/models/Products';
import { UserService } from 'src/app/core/services/user.service';
import { currentUser } from 'src/app/core/models/currentUser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList!: any[];
  selectedProduct!: Products;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.productList = data;
      console.log(data);
    });

  }
  onDelete(id:number){
    console.log(id)
    this.productService.deleteProduct(id).subscribe(data => {
      console.log(data);
      this.getproducts();
      this.router.navigateByUrl('/welcome/products');

    });
  }
  getproducts():void{
    this.productService.getAllProducts().subscribe(data => {
      this.productList = data;
      console.log(data);
    });
  }
  editProduct(product: Products): void {
    this.router.navigate(['/welcome/productupdate', product.idProducts]);
  }
  addproduct(){
    this.router.navigateByUrl('/welcome/addproduct');
  }
}
