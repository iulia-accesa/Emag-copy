import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromSearchActions from '../actions/index';
import { tap,take } from "rxjs";
import { SearchBarService } from "../../services/search-bar.service";
import { SearchBarProduct } from "../../models/search-bar.product";
@Injectable()
export class SearchEffects {

    inputChanged$ = createEffect(() => 
            this._actions$
            .pipe(
                
                take(1),
                ofType(fromSearchActions.inputChanged),
                tap(action =>{
                   
                    let result:SearchBarProduct[] = [{id:1,title:"mens",category:"mesn",rating:{rate:0,count:0}}];
                    //  this._searchBarService.getProductsForSearchBar(action.input)
                    //  .then(response => {
                    //     result = response;
                    //  });
                     console.log(result)
                    fromSearchActions.updateSearchResult({payload:result})
                })
            )
    );


    constructor(private _actions$: Actions,private _searchBarService: SearchBarService){

    }


}