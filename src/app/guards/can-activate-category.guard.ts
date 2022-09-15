import { ProductApiService } from '../services/product-api.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable()
export class CanActivateCategory implements CanActivate {
  constructor(
    private productApiService: ProductApiService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.productApiService.getAllCategories().pipe(
      map((categories) => {
        let categoryFound = categories.includes(route.params['categoryName']);
        if (!categoryFound) this.router.navigateByUrl('/');

        return categoryFound;
      })
    );
  }
}
