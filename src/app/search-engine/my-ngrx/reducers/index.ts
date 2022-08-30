import { createReducer,on } from "@ngrx/store";
import { from } from "rxjs";
import { defaultSearchBarProduct, SearchBarProduct } from "../../models/search-bar.product";
import { SearchBarService } from "../../searchbar/services/search-bar.service";
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
            searchResult:state.searchResult
        }
    })
    ,
    on(fromSearchActions.updateSearchResult,(state,action) => {
        return {
            searchResult: action.payload
        }
    })

    
);