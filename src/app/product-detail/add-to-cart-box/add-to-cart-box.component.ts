import { Component, Input } from '@angular/core';
import { DiscoutPercentageService } from 'src/app/services/discout-percentage.service';
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
      this.discountPers = this.discoutPercentageService.getPercentage(this._product.rating.rate);
      this.prodRating = this.discoutPercentageService.getRating(this._product.rating.rate);
      this.oldPrice = this.getOldPrice(this._product.price);
    }
  }
  discountPers: number = 0;
  oldPrice: number = 0;
  _product: IProductApi | undefined;
  prodRating = 0;

  constructor(private discoutPercentageService: DiscoutPercentageService) {}

  getOldPrice(price: number): number {
   return Math.round((1 + this.discountPers / 100) * price);
  }
}
