import { Component, OnInit } from '@angular/core';
import { IProductApi } from '../shared/models/product-api.interface'; 
import { ProductApiService } from '../services/product-api.service'; 
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})

export class DetailsPageComponent implements OnInit {
  product: any;
  
  constructor(private _productService: ProductApiService) {}
  
  ngOnInit() {
    this.getProduct()
  }
  
  getProduct(){
    return this._productService.getById(5).subscribe((data: IProductApi[]) => {
       this.product = data;
       console.log(this.product)
     });
   }

  
  calcRating(rat: number) {
    return Math.round(rat);
  }
  
}
