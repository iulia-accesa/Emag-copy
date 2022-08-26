import { createAction,props } from "@ngrx/store";

export const inputEntered = createAction(
    "[Search Bar] User entered input",
    props<{input: string}>()
)

