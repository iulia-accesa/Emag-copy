import { createAction, props } from "@ngrx/store";

import { User } from '../../account/user.model';

export enum AccountActionType {
    LOGIN_START = '[Account] Login Start',
    AUTHENTICATE_SUCCES = '[Account] Authenticate Succes',
    AUTHENTICATE_FAIL = '[Account] Authenticate Fail'
}

export const loginStart = createAction(
    AccountActionType.LOGIN_START,
    props<{ user: User }>()
);

export const authenticateSucces = createAction(
    AccountActionType.AUTHENTICATE_SUCCES,
    props<{ user: User }>()
);

export const authenticateFail = createAction(
    AccountActionType.AUTHENTICATE_FAIL,
    props<{ authError: string }>()
);
