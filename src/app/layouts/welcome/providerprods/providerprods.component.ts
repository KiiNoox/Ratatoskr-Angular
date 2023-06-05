import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/core/models/Products';
import { ProductService } from 'src/app/core/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { currentUser } from 'src/app/core/models/currentUser';
import { UserService } from 'src/app/core/services/user.service';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-providerprods',
  templateUrl: './providerprods.component.html',
  styleUrls: ['./providerprods.component.css']
})
export class ProviderprodsComponent implements OnInit {
  productList!: any[];
  selectedProduct!: Products;
  currentUser?: currentUser;
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private userService:UserService) { }

  ngOnInit(): void {
    this.userService.GetInfo(this.userService.GetEmailFromToken()).then(data => {
      this.currentUser = data;
      console.log(data);
    });
    if(this.currentUser){
    this.productService.getprovProducts(this.currentUser?.id!).subscribe(data => {
      this.productList = data;
      console.log(data);
    });}


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
