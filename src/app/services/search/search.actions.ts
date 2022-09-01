import { createAction,props } from "@ngrx/store"
import { SearchBarProduct } from "./searchbar-product.interface"

export const inputChanged = createAction(
    "[Searchbar] User changed input",
    props<{input: string}>()
)


export const updateSearchResult = createAction(
    "[Searchbar Input] Update search result",
    props<{payload: SearchBarProduct[]}>()
)


export const userSelectedOption = createAction(
    "[Searchbar options] User selected and option",
    props<{payload: SearchBarProduct}>()
)
