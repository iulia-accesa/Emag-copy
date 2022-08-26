import { createAction,props } from "@ngrx/store";

export const inputChanged = createAction(
    "[Search Bar] User changed input",
    props<{input: string}>()// asta nu mai are rost sa o pui aici
)

