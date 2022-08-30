import { createReducer,on } from "@ngrx/store";
import { from } from "rxjs";
import { defaultSearchBarProduct, SearchBarProduct } from "../../models/search-bar.product";
import { SearchBarService } from "../../searchbar/services/search-bar.service";
import * as fromSearchActions from '../actions/index';
export interface State{
    searchResult:SearchBarProduct[],
    userInput: string,
    userSelectedOption:SearchBarProduct
}



export const initState: State = {
    searchResult:[],
    userInput:"",
    userSelectedOption:defaultSearchBarProduct
}
export const reducer = createReducer(
    initState,
    on(fromSearchActions.inputChanged,(state,action) => {
        
        return {
            searchResult:state.searchResult,
            userInput:action.input,
            userSelectedOption:state. userSelectedOption
        }
    })
    ,
    on(fromSearchActions.updateSearchResult,(state,action) => {
        return {
            searchResult: action.payload,
            userInput:state.userInput,
            userSelectedOption:state. userSelectedOption
        }
    }),
    on(fromSearchActions.userSelectedOption,(state,action) => {
        return {
            searchResult:state.searchResult,
            userInput:state.userInput,
            userSelectedOption:{...action.payload}
        }
    })

    
);