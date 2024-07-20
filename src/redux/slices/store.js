import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import feedbackReducer from './feedbackSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    feedback: feedbackReducer
  }
});

export default store;
