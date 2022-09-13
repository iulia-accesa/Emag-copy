import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {  select, Store } from '@ngrx/store';

import * as HistoryReducer from './history.reducer';
import * as HistoryActions from './history.actions';
import * as HistorySelectors from './history.selectors';

@Injectable()
export class HistoryService {

  constructor(
    private store: Store<HistoryReducer.State>
  ) {
  }

  updateHistory$(image: string, category: string): void {
    this.store.dispatch(HistoryActions.updateHistory({ image, category }));
  }

  getHistory$(): Observable<{image: string, category: string}[]> {
    return this.store.pipe(select(HistorySelectors.getProductList));
  }

}
