import { ActionReducerMap, createReducer, on } from '@ngrx/store';

import * as HistoryActions from './history.actions';

export const historyFeatureKey = 'history';

export interface State {
    productHistory?: {
        image: string,
        category: string
    }[]
}

const initialState: State = {
    productHistory: [],
};

export const reducer = createReducer(
    initialState,

    on (HistoryActions.updateHistory, (state, action) => {
        // let newState: any[] = state.productHistory ? [...state.productHistory] : [];
        const newProduct = {
            image: action.image,
            category: action.category
        };
        let newState:  {
            image: string,
            category: string
        }[] = state.productHistory ? [...state.productHistory.filter(item => item.image !== newProduct.image || item.category !== newProduct.category)] : [];
        newState.unshift(newProduct);
        newState = newState.slice(0, 5);
        return {productHistory: newState};
    })
);

export const historyReducer: ActionReducerMap<{history: State}> = {
  history: reducer
};
