import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as fromSearchActions from '../actions/index';
import { tap, take, switchMap, map,concatMap } from 'rxjs';
import { SearchBarService } from '../../services/search-bar.service';
import { SearchBarProduct } from '../../models/search-bar.product';
@Injectable()
export class SearchEffects {

  inputChanged$ = createEffect(() =>
    this._actions$.pipe(
    //  take(1),//solve this
      ofType(fromSearchActions.inputChanged),
      concatMap( action =>
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
