import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, observable, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { SearchbarProductsPageService } from './searchbar-products-page.service';

@Component({
  selector: 'app-searchbar-products-page',
  templateUrl: './searchbar-products-page.component.html',
  styleUrls: ['./searchbar-products-page.component.scss'],
})
export class SearchbarProductsPageComponent implements OnInit {
  private _searchKey: string = '';
  products$ : Observable<Product[]> = of([])
  constructor(private _route: ActivatedRoute,private _service: SearchbarProductsPageService ) {}

  ngOnInit(): void {
    this._route.queryParams.pipe(first()).subscribe((params) => {
      this._searchKey = params['searchKey'];
      this.products$ = this._service.filterProductsBySearchKey(this._searchKey);
      this.products$.pipe(
        first()
      ).subscribe(val => console.log(val))
    });
  }



}
