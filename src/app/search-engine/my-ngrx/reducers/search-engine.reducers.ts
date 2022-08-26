import { createReducer } from "@ngrx/store";
import { SearchBarProduct } from "../../models/search-bar.product";


export interface State{
    searchResult:SearchBarProduct[]
}



export const initState: State = {
    searchResult:[]
}
export const reducer = createReducer(

);