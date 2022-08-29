import { createAction,props } from "@ngrx/store";
import { SearchBarProduct } from "../../models/search-bar.product";
export const inputChanged = createAction(
    "[Searchbar] User changed input",
    props<{input: string}>()
)


export const updateSearchResult = createAction(
    "[Searchbar Input] Update search result",
    props<{payload: SearchBarProduct[]}>()
)
