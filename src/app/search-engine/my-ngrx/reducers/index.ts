import { createReducer,on } from "@ngrx/store";
import { from } from "rxjs";
import { SearchBarProduct } from "../../models/search-bar.product";
import { SearchBarService } from "../../services/search-bar.service";
import * as fromSearchActions from '../actions/index';
export interface State{
    searchResult:SearchBarProduct[],
    userInput: string
}



export const initState: State = {
    searchResult:[],
    userInput:""
}
export const reducer = createReducer(
    initState,
    on(fromSearchActions.inputChanged,(state,action) => {
        
        return {
            searchResult:state.searchResult,
            userInput:action.input
        }
    })
    ,
    on(fromSearchActions.updateSearchResult,(state,action) => {
        return {
            searchResult: action.payload,
            userInput:state.userInput
        }
    })
    
);