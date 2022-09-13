import { Component, Input } from '@angular/core';
import { DiscoutPersentageService } from 'src/app/services/discout-persentage.service';
import { IProductApi } from 'src/app/shared/models/product-api.interface';

@Component({
  selector: 'app-add-to-cart-box',
  templateUrl: './add-to-cart-box.component.html',
  styleUrls: ['./add-to-cart-box.component.scss'],
})
export class AddToCartBoxComponent {
  @Input() set product(value: IProductApi) {
    if (value) {
      this._product = value;
    }
  }
  discountPers: number = 0;
  oldPrice: number = 0;
  _product: IProductApi | undefined;
  prodRating = 0;

  constructor(private shared: DiscoutPersentageService) {}

  ngOnInit() {
    if (this._product) {
      this.discountPers = this.shared.getPercentage(this._product.rating.rate);
      this.prodRating = this.shared.getRating(this._product?.rating.rate);
      this.calcOldPrice(this._product.price)
    }
  }

  calcOldPrice(price:number):void{
    this.oldPrice = Math.round((1 + this.discountPers / 100) * price)
  }
}
