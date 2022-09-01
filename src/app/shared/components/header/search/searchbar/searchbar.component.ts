import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SearchBarProduct } from 'src/app/services/search/searchbar-product.interface';
import { SearchBarService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchBarComponent implements OnInit {


  options$: Observable<SearchBarProduct[]>;
  _searchInput: string = "";
  private timeout: any;
  updateDebounceText = this.debounce((text: string) => {
    if(text.length > 2){
      this._searchBarService.dispatchInputChangedAction(text)
 
    }else{
      this._searchBarService.dispatchInputChangedAction("")
     
    }
  });

  constructor(
    private _searchBarService: SearchBarService,
    private _router:Router
  ) {
    this.options$ = this._searchBarService.selectSearchResult()
  }

  ngOnInit(): void {
   
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
    this._searchInput = event.target.value;
    this.updateDebounceText(event.target.value);
  }

  redirectPage(option: SearchBarProduct) {

 
    console.log("here");
  }

  onEnter(){
    
    this._router.navigate(["search/products"],{queryParams:{searchKey:this._searchInput}})
  }
}
