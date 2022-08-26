import { createAction,props } from "@ngrx/store";
import { SearchBarProduct } from "../../models/search-bar.product";
import { Observable } from "rxjs";
export const inputChanged = createAction(
    "[Search Bar] User changed input",
    props<{input: string}>()// asta nu mai are rost sa o pui aici
)


export const updateSearchResult = createAction(
    "[Search Bar] Update search result",
    props<{payload: SearchBarProduct[]}>()
)
