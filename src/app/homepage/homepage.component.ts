import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProductApi } from './../shared/models/product-api.interface';
import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  products$: Observable<IProductApi[]> = this.productService.getAll();
  categories$: Observable<string[]> = this.productService.getAllCategories();
  categorizedProducts$: Map<string, Observable<IProductApi[]>> = new Map<
    string,
    Observable<IProductApi[]>
  >();

  constructor(public productService: ProductApiService) {}

  ngOnInit(): void {
    this.categories$ = this.categories$.pipe(
      map((categories) => {
        for (let i = 0; i < categories.length; i++) {
          categories[i] =
            categories[i].charAt(0).toUpperCase() + categories[i].slice(1);
        }
        return categories;
      })
    );

    this.categories$.subscribe((categories) => {
      return categories.map((category) => {
        this.categorizedProducts$.set(
          category,
          this.getProductsByCategory(category.toLowerCase())
        );
      });
    });
  }

  getProductsByCategory(category: string): Observable<IProductApi[]> {
    const actualProducts$ = this.productService.getByCategory(category);
    return actualProducts$.pipe(
      map((products) =>
        products
          .sort((p1: IProductApi, p2: IProductApi) => {
            return p1.rating.rate > p2.rating.rate ? -1 : 1;
          })
          .slice(0, 5)
      )
    );
  }
}
