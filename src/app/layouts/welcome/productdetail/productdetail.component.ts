import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Products } from 'src/app/core/models/Products';
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  productId!: number;
  product!: Products;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.getProductDetails();
  }

  getProductDetails() {
    this.productService.getProductById(this.productId)
      .subscribe(product => this.product = product);
    console.log(this.product.idProducts);
}
}
