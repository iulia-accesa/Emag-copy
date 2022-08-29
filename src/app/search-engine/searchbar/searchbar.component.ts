import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { SearchBarProduct } from '../models/search-bar.product';
import { SearchBarService } from '../services/search-bar.service';
import * as fromSearchActions from '../my-ngrx/actions/index';
import * as fromSearchSelectors from '../my-ngrx/selectors/index'
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchBarComponent implements OnInit {


  options$: Observable<SearchBarProduct[]>;

  
  private timeout:any;
  updateDebounceText = this.debounce((text:string) => {
    this._store.dispatch(fromSearchActions.inputChanged({input:text}));
   
 });




  constructor(private _searchBarService: SearchBarService,private _store: Store) { 
   
    this.options$ = this._store.select(fromSearchSelectors.searchResult);
   
  }

  ngOnInit(): void {
  
  }



 
  private debounce(cb:any,delay = 300){
      
    return (...args:any) => {
        clearTimeout(this.timeout);
       this.timeout =  setTimeout(() => {
            cb(...args)
        },delay)
    }
  }

  onInputChanged(event:any){
   
   
   this.updateDebounceText(event.target.value);
   
    
  }


  redirectPage(option:SearchBarProduct){
    console.log(option);
    
  }






}
