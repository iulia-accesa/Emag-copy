import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from "rxjs";
import * as fromSearchActions from './search.actions'
import { SearchBarService } from "./search.service";
import { SearchBarProduct } from "./searchbar-product.interface";
@Injectable()
export class SearchEffects {
  inputChanged$ = createEffect(() =>
    this._actions$.pipe(
  ofType(fromSearchActions.inputChanged),
      concatMap((action) =>
        this._searchBarService
          .getProductsForSearchBar$(action.input)
          .pipe(
            map((obsProducts: SearchBarProduct[]) =>
              fromSearchActions.updateSearchResult({ payload: obsProducts })
            ),
            catchError(errorResult => of(fromSearchActions.searchFailed({ payload: errorResult.error})))
          )
      )
    )

    

  );

  constructor(
    private _actions$: Actions,
    private _searchBarService: SearchBarService
  ) {}
}
