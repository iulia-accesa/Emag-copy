import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions) {}
}
