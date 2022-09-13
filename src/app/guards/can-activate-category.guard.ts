import { ProductApiService } from '../services/product-api.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable()
export class CanActivateCategory implements CanActivate {
  constructor(private productApiService: ProductApiService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.productApiService.getAllCategories().pipe(
      map((categories) => {
        return categories.includes(route.params['categoryName']);
      })
    );
  }
}
