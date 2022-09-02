import { Component, Input } from '@angular/core';
import { IProductApi } from 'src/app/shared/models/product-api.interface'; 


@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.scss']
})
export class ProductPhotosComponent{
  @Input() set product(value: IProductApi){
    if(value) {
      this._product = value;
    }
  }
  public _product: IProductApi | undefined;
  public image: string | undefined;

  constructor() {}

  ngOnInit() {

  }

}