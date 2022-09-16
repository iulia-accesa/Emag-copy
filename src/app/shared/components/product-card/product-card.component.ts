import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { DiscoutPercentageService } from 'src/app/services/discout-percentage.service';
import { IProductApi } from '../../models/product-api.interface';

@Component({
  selector: 'product-card-component',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() set product(value: IProductApi) {
    if (value) {
      this._product = value;
      this.prodRating = Math.round(this._product.rating.rate);
      this.discountPers = this.discoutPercentageService.getPercentage(
        this._product.rating.rate
      );
    }
  }
  _product: IProductApi | undefined;
  isWideButton: boolean = false;
  prodRating = 0;
  path: string | undefined;
  discountPers: number = 0;
  constructor(private discoutPercentageService: DiscoutPercentageService, private cartService: CartService) {}
  ngOnInit() {
    this.path = decodeURI(window.location.pathname).split('/')[1];
  }

  addProductToCart(){
    this.cartService.addProduct(this._product!.id)
  }
}
