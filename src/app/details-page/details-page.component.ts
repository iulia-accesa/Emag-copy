import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})

export class DetailsPageComponent implements OnInit {
  test_var = 'Im parent';
  public product: any;
  public image: string | undefined;
  output_rating = this.calcRating

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this._productService.getProduct().subscribe((data: IProduct[]) => {
      this.product = data;
    });
  }
  
  calcRating(rat: number) {
    return Math.round(rat);
  }
  
}
