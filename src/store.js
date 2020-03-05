import {configureStore} from '@reduxjs/toolkit';
import scoreReducer from './features/scoreList/scoreListSlice';

export default configureStore({
  reducer: {
    score: scoreReducer
  }
});
