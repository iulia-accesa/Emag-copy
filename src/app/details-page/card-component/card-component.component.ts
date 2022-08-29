import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/product';
import { ProductService } from 'src/app/product.service';
import { AddToCartBoxComponent } from '../add-to-cart-box/add-to-cart-box.component';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss']
})
export class CardComponentComponent implements OnInit {
  public product: any;
  public image: string | undefined;
  @Input() rating!: AddToCartBoxComponent;
  @Input() item: any;

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this._productService.getProduct().subscribe((data: IProduct[]) => {
      this.product = data;
      this._productService.currentData.subscribe((_productService) => {});
    });
  }
}
