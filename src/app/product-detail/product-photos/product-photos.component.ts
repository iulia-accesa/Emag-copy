import { Component, Input } from '@angular/core';
import { getPercentage } from 'src/app/shared/function/functionTest';
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
  discountPers:number = 0;

  constructor() {}

  ngOnInit(){
    if(this._product){
      this.discountPers = getPercentage(this._product.rating.rate)
    }
  }
}
