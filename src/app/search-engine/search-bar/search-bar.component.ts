import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { SearchBarProduct } from '../models/search-bar.product';
import { SearchBarService } from '../services/search-bar.service';
import * as fromSearchActions from '../my-ngrx/actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {


  options$: Observable<String[]> | undefined;

  
  private timeout:any;
  updateDebounceText = this.debounce((text:string) => {
    console.log(text);
   
    this.options$ = of([text]);//fac un select din store pentru products search result
 });




  constructor(private _searchBarService: SearchBarService,private _store: Store<AppState>) { 
    
    this.options$ = of();
   
  }

  ngOnInit(): void {
  
  }



 
  private debounce(cb:any,delay = 800){
      
    return (...args:any) => {
        clearTimeout(this.timeout);
       this.timeout =  setTimeout(() => {
            cb(...args)
        },delay)
    }
  }

  onInputChanged(event:any){
   
   
   this.updateDebounceText(event.target.value);
   this._store.dispatch(fromSearchActions.inputChanged({input:event.target.value}));
    
  }







}
