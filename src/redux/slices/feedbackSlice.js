import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feedbackList: [],
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    addFeedback: (state, action) => {
      state.feedbackList.push(action.payload);
    },
  },
});

export const { addFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
