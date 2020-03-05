import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'score',
  initialState: {
    lastRound: 2,
    score: [
      {
        key: 0,
        round: 1,
        wij: 120,
        zij: 43
      },
      {
        key: 1,
        round: 2,
        wij: 120,
        zij: 43
      }
    ]
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
    }
  }
});

export const getScore = state => state.score.score;
export const {addScore} = slice.actions;

export default slice.reducer;
