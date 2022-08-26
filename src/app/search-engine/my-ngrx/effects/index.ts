import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromSearchActions from '../actions/index';
import { tap } from "rxjs";
import { SearchBarService } from "../../services/search-bar.service";
import { SearchBarProduct } from "../../models/search-bar.product";
@Injectable()
export class SearchEffects {

    inputChanged$ = createEffect(() => 
            this._actions$
            .pipe(
                ofType(fromSearchActions.inputChanged),
                tap(action =>{
                
                    let result:SearchBarProduct[] =  [];
                    fromSearchActions.updateSearchResult({payload:result})
                })
            )
    );


    constructor(private _actions$: Actions,private _searchBarService: SearchBarService){

    }


}