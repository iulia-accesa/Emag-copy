import { Injectable } from "@angular/core";
import { createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";

@Injectable()
export class SearchEffects {
  inputChanged$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromSearchActions.inputChanged),
      concatMap((action) =>
        this._searchBarService
          .getProductsForSearchBar(action.input)
          .pipe(
            map((obsProducts: SearchBarProduct[]) =>
              fromSearchActions.updateSearchResult({ payload: obsProducts })
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
