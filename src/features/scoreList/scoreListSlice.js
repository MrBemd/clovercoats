import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'score',
  initialState: {
    lastRound: 0,
    score: []
  },
  reducers: {
    addScore: (state, action) => {
      state.lastRound++;
      state.score.push({
        key: state.lastRound - 1,
        round: state.lastRound,
        wij: action.payload.wij,
        zij: action.payload.zij
      });
    },
    deleteScore: (state, action) => {

      state.score = state.score.filter((itm) => {return itm.key !== action.payload;});

      // reset lastRound
      if (state.lastRound > 0) {
        state.lastRound--;
      }

    },
    startNew: (state) => {
      state.score = [];
      state.lastRound = 0;
    }
  }
});

export const getScore = state => state.score.score;
export const {addScore, deleteScore, startNew} = slice.actions;

export default slice.reducer;
