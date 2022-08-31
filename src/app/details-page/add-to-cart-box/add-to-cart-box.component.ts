import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models'; 
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-add-to-cart-box',
  templateUrl: './add-to-cart-box.component.html',
  styleUrls: ['./add-to-cart-box.component.scss'],
})
export class AddToCartBoxComponent implements OnInit {
  public product: any;
  public test: any;
  public image: string | undefined;
  data: any;

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this._productService.getProduct().subscribe((data: IProduct[]) => {
      this.product = data;
    });
  }

  calcOldPrice(price: number, discount: number) {
    return Math.round(price * (discount / 100 + 1));
  }

  calcRating(rat: number):number{
    return Math.round(rat);
  }
}
