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
    },
    deleteScore: (state, action) => {

      state.score = state.score.filter((itm) => {return itm.key !== action.payload;});

      // reset lastRound
      if (state.lastRound > 0) {
        state.lastRound--;
      }

    }
  }
});

export const getScore = state => state.score.score;
export const {addScore, deleteScore} = slice.actions;

export default slice.reducer;
