import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import scoreReducer from './features/scoreList/scoreListSlice';
import {save, load} from 'redux-localstorage-simple';

export default configureStore({
  reducer: {
    score: scoreReducer
  },
  preloadedState: load(),
  middleware: [save(), ...getDefaultMiddleware()]
});
