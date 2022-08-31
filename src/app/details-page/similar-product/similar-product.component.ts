import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models';  
import { ProductService } from 'src/app/product.service';
import { AddToCartBoxComponent } from '../add-to-cart-box/add-to-cart-box.component';

@Component({
  selector: 'app-similar-product',
  templateUrl: './similar-product.component.html',
  styleUrls: ['./similar-product.component.scss'],
})
export class SimilarProductComponent implements OnInit {
  public product: any;
  public image: string | undefined;
  @Input() rating!: AddToCartBoxComponent;
  @Input() item: any;

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this._productService.getProduct().subscribe((data: IProduct[]) => {
      this.product = data;
    });
  }
}
