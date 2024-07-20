import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Button, Box } from '@mui/material';
import ChatBox from './components/ChatBox';
import FeedbackForm from './components/FeedbackForm';
import ConversationList from './components/ConversationList';
import FeedbackList from './components/FeedbackList';
import Sidebar from './components/Sidebar';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const addMessage = (message) => {
    setCurrentMessages((prevMessages) => [...prevMessages, message]);
  };

  const saveConversation = () => {
    setConversations((prevConversations) => [
      ...prevConversations,
      { messages: currentMessages, feedback: null },
    ]);
    setCurrentMessages([]);
  };

  const selectConversation = (index) => {
    setSelectedConversation(conversations[index]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box display="flex">
          <Sidebar conversations={conversations} selectConversation={selectConversation} />
          <Box flexGrow={1} p={3}>
            <Button onClick={() => setDarkMode(!darkMode)}>
              Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </Button>
            <Routes>
              <Route
                path="/"
                element={
                  <ChatBox
                    messages={currentMessages}
                    addMessage={addMessage}
                    saveConversation={saveConversation}
                    selectedConversation={selectedConversation}
                  />
                }
              />
              <Route path="/feedback" element={<FeedbackForm />} />
              <Route path="/history" element={<ConversationList />} />
              <Route path="/summary" element={<FeedbackList />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
