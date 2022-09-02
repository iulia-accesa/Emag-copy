import { Observable} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IProductApi } from './../shared/models/product-api.interface';

import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  products$: Observable<IProductApi[]> | undefined;
  categories$: Observable<string[]> | undefined;
  
  constructor(private productService: ProductApiService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories()
  }

  getProducts(): void {
    this.products$ = this.productService.getAll()
  }

  getCategories(): void {
    this.categories$ = this.productService.getAllCategories()
  }
}

