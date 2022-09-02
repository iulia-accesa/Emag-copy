import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import * as fromSearch from 'src/app/services/search/search.reducer'
import { environment } from "src/environments/environment";



export interface IAppState {
    search: fromSearch.State
}


export const appReducers: ActionReducerMap<IAppState> = {
    search: fromSearch.reducer
}

