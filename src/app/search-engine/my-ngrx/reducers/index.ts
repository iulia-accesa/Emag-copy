import { createReducer,on } from "@ngrx/store";
import { SearchBarProduct } from "../../models/search-bar.product";
import * as fromSearchActions from '../actions/index';
export interface State{
    searchResult:SearchBarProduct[]
}



export const initState: State = {
    searchResult:[]
}
export const reducer = createReducer(
    initState,
    on(fromSearchActions.inputChanged,(state,action) => {
        return {
            searchResult:[]
        }
    })
    
);