import { Component, OnInit } from '@angular/core';

import { Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProductApi } from './../shared/models/product-api.interface';
import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  products$: Observable<IProductApi[]> | undefined;
  categories$: Observable<string[]> | undefined;
  categorizedProducts$: Map<string, Observable<IProductApi[]>> = new Map<
    string,
    Observable<IProductApi[]>
  >();

  constructor(public productService: ProductApiService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getProductCategories();
    this.productService.getAllCategories().subscribe((categories) => {
      categories.map((category) => {
        this.categorizedProducts$.set(category, this.getProductsByCategory(category));
      });
    });

    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => console.log(json));
  }

  getProducts(): void {
    this.products$ = this.productService.getAll();
  }

  getProductCategories(): void {
    this.categories$ = this.productService.getAllCategories();
  }

  getProductsByCategory(category: string): Observable<IProductApi[]> {
    const actualProducts$ = this.productService.getByCategory(category);
    return actualProducts$.pipe(
      map((products) =>
        products.sort((p1: IProductApi, p2: IProductApi) => {
          return p1.rating.rate > p2.rating.rate ? -1 : 1;
        }).slice(0, 5)
      ),
      take(1)
    );
  }
}
