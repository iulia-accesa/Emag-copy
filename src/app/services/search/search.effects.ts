import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import * as fromActions from './search.actions'
import { SearchBarService } from "./search.service";
import { SearchBarProduct } from "./searchbar-product.interface";
@Injectable()
export class SearchEffects {
  inputChanged$ = createEffect(() =>
    this._actions$.pipe(
  ofType(fromActions.inputChanged),
      concatMap((action) =>
        this._searchBarService
          .getProductsForSearchBar$(action.input)
          .pipe(
            map((obsProducts: SearchBarProduct[]) =>
              fromActions.updateSearchResult({ payload: obsProducts })
            )
          )
      )
    )

    

  );

  constructor(
    private _actions$: Actions,
    private _searchBarService: SearchBarService
  ) {}
}
