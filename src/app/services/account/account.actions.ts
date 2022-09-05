import { createAction, props } from "@ngrx/store";

export enum AccountActionType {
    LOGIN_START = '[Account] Login Start',
    AUTHENTICATE_SUCCES = '[Account] Authenticate Succes',
    AUTHENTICATE_FAIL = '[Account] Authenticate Fail'
}

export const loginStart = createAction(
    AccountActionType.LOGIN_START,
    props<{ 
        username: string, 
        password: string
    }>()
);

export const authenticateSucces = createAction(
    AccountActionType.AUTHENTICATE_SUCCES,
    props<{ 
        username: string,
        token: string
    }>()
);

export const authenticateFail = createAction(
    AccountActionType.AUTHENTICATE_FAIL,
    props<{ 
        authError: string 
    }>()
);
