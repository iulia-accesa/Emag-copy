import { createReducer,on } from "@ngrx/store";
import { SearchBarProduct } from "./searchbar-product.interface";
import * as fromActions from './search.actions';
export interface State{
    searchResult:SearchBarProduct[]
}



export const initState: State = {
    searchResult:[]
   
}
export const reducer = createReducer(
    initState,
    on(fromActions.inputChanged,(state,action) => {
        
        return {
            searchResult:state.searchResult
        }
    })
    ,
    on(fromActions.updateSearchResult,(state,action) => {
        return {
            searchResult: action.payload
        }
    })

    
);