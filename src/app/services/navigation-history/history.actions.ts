import { createAction, props } from '@ngrx/store';

export enum HistoryActionType {
  UPDATE_HISTORY = '[History] History updated',
}

export const updateHistory = createAction(
  HistoryActionType.UPDATE_HISTORY,
  props<{
    product: {
        image: string;
        category: string;
    };
  }>()
);
