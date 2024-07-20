import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversations: [],
    currentConversation: null,
  },
  reducers: {
    startConversation(state) {
      state.currentConversation = { id: Date.now(), messages: [], feedback: null };
      state.conversations.push(state.currentConversation);
    },
    addMessage(state, action) {
      state.currentConversation.messages.push(action.payload);
    },
    endConversation(state, action) {
      state.currentConversation.feedback = action.payload;
      state.currentConversation = null;
    },
  },
});

export const { startConversation, addMessage, endConversation } = chatSlice.actions;
export default chatSlice.reducer;
