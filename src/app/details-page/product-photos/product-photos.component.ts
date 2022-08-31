import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models'; 
import { ProductService } from '../../product.service';


@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.scss']
})
export class ProductPhotosComponent implements OnInit {

  public product: any;
  public test: any;
  public image: string | undefined;

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this._productService.getProduct().subscribe((data: IProduct[]) => {
      this.product = data;
      this.image = data[0].image;
    });
  }

}