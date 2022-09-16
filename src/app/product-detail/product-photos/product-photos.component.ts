import { Component, Input } from '@angular/core';
import { DiscoutPercentageService } from 'src/app/services/discout-percentage.service';
import { IProductApi } from 'src/app/shared/models/product-api.interface';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.scss'],
})
export class ProductPhotosComponent {
  @Input() set product(value: IProductApi) {
    if (value) {
      this._product = value;
      this.discountPers = this.discoutPercentageService.getPercentage(
        this._product.rating.rate
      );
    }
  }
  _product: IProductApi | undefined;
  image: string | undefined;
  discountPers: number = 0;

  constructor(private discoutPercentageService: DiscoutPercentageService) {}
}
