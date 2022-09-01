import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Observable, of} from 'rxjs';
import { IProduct } from 'src/app/shared/components/product-card/product-card.component.interface';
import { ProductListSearchEngineService } from "src/app/services/product-list-search-engine/product-list-search-engine.service";

@Component({
  selector: 'app-searchbar-products-page',
  templateUrl: './product-list-search-engine.component.html',
  styleUrls: ['./product-list-search-engine.scss'],
})
export class ProductListSearchEngineComponent implements OnInit {
  private _searchKey: string = '';
  products$ : Observable<IProduct[]> = of([])
  anyResults: boolean = true;
  constructor(private _route: ActivatedRoute,private _service: ProductListSearchEngineService ) {}

  ngOnInit(): void {
    this._route.queryParams.pipe(first()).subscribe((params) => {
      this._searchKey = params['searchKey'];
      this.products$ = this._service.filterProductsBySearchKey(this._searchKey);
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
