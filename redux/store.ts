import { combineReducers } from 'redux';
import { MakeStore, createWrapper, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';

import ui, { UiState } from './ui';
import data, { DataState } from './data';

export interface AppState {
  ui: UiState
  data: DataState
}

const combinedReducer = combineReducers({
  ui,
  data,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };

    // preserve count value on client side navigation:
    if (state.count) {
      nextState.count = state.count;
    }

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore: MakeStore<AppState> = () => configureStore<AppState>({ reducer });

export const reduxWrapper = createWrapper<AppState>(makeStore, { debug: true });
