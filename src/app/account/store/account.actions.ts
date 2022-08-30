import { User } from './../user.model';
import { createAction, props } from "@ngrx/store";

export enum AccountActionType {
    LOGIN_START = '[Account] Login Start',
    AUTHENTICATE_SUCCES = '[Account] Authenticate Succes',
    AUTHENTICATE_FAIL = '[Account] Authenticate Fail'
}

export const LoginStart = createAction(
    AccountActionType.LOGIN_START,
    props<{ user: User }>()
);

export const AuthenticateSucces = createAction(
    AccountActionType.AUTHENTICATE_SUCCES,
    props<{ user: User }>()
);

export const AuthenticateFail = createAction(
    AccountActionType.AUTHENTICATE_FAIL,
    props<{ authError: string }>()
);
