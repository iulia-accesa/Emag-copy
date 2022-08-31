import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, observable, Observable, of} from 'rxjs';
import { IProduct } from 'src/app/shared/product-card/product-card.component.interface';
import { SearchbarProductsPageService } from './searchbar-products-page.service';

@Component({
  selector: 'app-searchbar-products-page',
  templateUrl: './searchbar-products-page.component.html',
  styleUrls: ['./searchbar-products-page.component.scss'],
})
export class SearchbarProductsPageComponent implements OnInit {
  private _searchKey: string = '';
  products$ : Observable<IProduct[]> = of([])
  anyResults: boolean = true;
  constructor(private _route: ActivatedRoute,private _service: SearchbarProductsPageService ) {}

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
