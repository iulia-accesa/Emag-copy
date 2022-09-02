
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Observable, of} from 'rxjs';
import { ProductListSearchEngineService } from '../services/product-list-search-engine/product-list-search-engine.service';

import { IProductApi } from '../shared/models/product-api.interface';

@Component({
  selector: 'app-searchbar-products-page',
  templateUrl: './product-list-search-engine.component.html',
  styleUrls: ['./product-list-search-engine.scss'],
})
export class ProductListSearchEngineComponent implements OnInit {
  private _searchKey: string = '';
  products$ : Observable<IProductApi[]> = of([])
  anyResults: boolean = true;
  constructor(private _route: ActivatedRoute,private _service: ProductListSearchEngineService ) {}

  ngOnInit(): void {
    this._route.queryParams.pipe(first()).subscribe((params) => {
      this._searchKey = params['searchKey'];
      this.products$ = this._service.filterProductsBySearchKey$(this._searchKey);
      this.checkForResults();
     
    });
  }

  /**
   * return false if the content of the products$ observables is an empty list,
   * true otherwise
   */
  checkForResults(){
    this.products$.pipe(
      first()
    ).subscribe(val => {
      if(val.length === 0){
          this.anyResults = false
      }
    })

  }



}
