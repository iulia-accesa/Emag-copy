import { createAction, props } from "@ngrx/store";

import { IUser } from 'src/app/services/account/user.interface';

export enum AccountActionType {
    LOGIN_START = '[Account] Login Start',
    AUTHENTICATE_SUCCES = '[Account] Authenticate Succes',
    AUTHENTICATE_FAIL = '[Account] Authenticate Fail',
    LOAD_ACCOUNT_START = '[Account] Load Acount Page Start',
    LOAD_ACCOUNT_SUCCES = '[Account] Load Acount Page Succes',
    LOAD_ACCOUNT_FAIL = '[Account] Load Acount Page Fail'
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

export const loadAccountStart = createAction(
    AccountActionType.LOAD_ACCOUNT_START,
    props<{
        username?: string
    }>()
);

export const loadAccountSucces = createAction(
    AccountActionType.LOAD_ACCOUNT_SUCCES,
    props<{
        user: IUser
    }>()
);

export const loadAccountFail = createAction(
    AccountActionType.LOAD_ACCOUNT_FAIL,
    props<{
        accountError: string
    }>()
);