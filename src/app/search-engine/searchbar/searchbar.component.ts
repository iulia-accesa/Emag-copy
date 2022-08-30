import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, map, take, first } from 'rxjs';

import { SearchBarProduct } from '../models/search-bar.product';
import { SearchBarService } from '../services/search-bar.service';
import * as fromSearchActions from '../my-ngrx/actions/index';
import * as fromSearchSelectors from '../my-ngrx/selectors/index';
import { myTestWhat } from '../models/product';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Input() product: myTestWhat = {id:0,a:0,c:0,d:0};

  options$: Observable<SearchBarProduct[]>;
  
  private timeout: any;
  updateDebounceText = this.debounce((text: string) => {
    if(text.length > 2){
    this._store.dispatch(fromSearchActions.inputChanged({ input: text }));
    }else{
      this._store.dispatch(fromSearchActions.inputChanged({ input: "" }));
    }
  });

  constructor(
    private _searchBarService: SearchBarService,
    private _store: Store
  ) {
    this.options$ = this._store.select(fromSearchSelectors.searchResult);
  }

  ngOnInit(): void {
    console.log(this.product)
  }

  private debounce(cb: any, delay = 300) {
    return (...args: any) => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  onInputChanged(event: any) {
    this.updateDebounceText(event.target.value);
  }

  redirectPage(option: SearchBarProduct) {
    //console.log(option);
   
   this._store.dispatch(fromSearchActions.userSelectedOption({payload:option}))
  }
}
