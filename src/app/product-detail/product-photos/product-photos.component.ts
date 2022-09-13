import { Component, Input } from '@angular/core';
import { DiscoutPersentageService } from 'src/app/services/discout-persentage.service';
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
    }
  }
  _product: IProductApi | undefined;
  image: string | undefined;
  discountPers: number = 0;

  constructor(private shared: DiscoutPersentageService) {}

  ngOnInit() {
    if (this._product) {
      this.discountPers = this.shared.getPercentage(this._product?.rating.rate);
    }
  }
}
