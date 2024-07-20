import React, { useState, useEffect } from 'react';
import './ChatBox.css';
import userAvatar from '../assets/download.png';
import aiAvatar from '../assets/logo.png';
import { Button, TextField, Paper, Typography, IconButton, Box, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import sampleData from '../data/sampleData.json'; // Import the JSON data

const predefinedQuestions = [
  "Hi, what is the weather",
  "Hi, what is my location",
  "Hi, what is the temperature",
  "Hi, how are you"
];

const ChatBox = ({ messages, addMessage, saveConversation, selectedConversation }) => {
  const [input, setInput] = useState('');
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);

  useEffect(() => {
    if (selectedConversation) {
      setInput('');
    }
  }, [selectedConversation]);

  const handleSend = () => {
    const userMessage = { text: input, user: true, time: new Date().toLocaleTimeString() };
    const aiResponse = { text: getAIResponse(input), user: false, time: new Date().toLocaleTimeString() };

    addMessage(userMessage);
    addMessage(aiResponse);

    setInput('');
  };

  const getAIResponse = (input) => {
    const response = sampleData.find(item => item.question.toLowerCase() === input.toLowerCase());
    return response ? response.response : "I don't understand the question.";
  };

  const handleThumbsDown = (index) => {
    setSelectedMessageIndex(index);
    setFeedbackOpen(true);
  };

  const handleFeedbackSubmit = () => {
    const updatedMessages = [...messages];
    updatedMessages[selectedMessageIndex].feedback = {
      text: feedbackText,
      rating: feedbackRating
    };
    addMessage(updatedMessages[selectedMessageIndex]);
    setFeedbackOpen(false);
    setFeedbackText('');
    setFeedbackRating(0);
    setSelectedMessageIndex(null);
  };

  return (
    <Box p={3} bgcolor="#F3E5F5" flexGrow={1} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>How Can I Help You Today?</Typography>
      <Box mb={3}>
        <img src={aiAvatar} alt="Center" style={{ width: 80, height: 80 }} />
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {predefinedQuestions.map((prompt, index) => (
          <Grid item xs={5} key={index}>
            <Paper elevation={3} style={{ padding: 20 }} onClick={() => setInput(prompt)}>
              <Typography variant="h6">{prompt}</Typography>
              <Typography variant="body2">Get immediate AI generated response</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Paper elevation={3} className="chat-box" style={{ marginTop: 20, width: '80%' }}>
        {(selectedConversation ? selectedConversation.messages : messages).map((msg, index) => (
          <div key={index} className="message">
            <img src={msg.user ? userAvatar : aiAvatar} alt="avatar" className="avatar" />
            <Box>
              <Typography>{msg.user ? 'You' : 'Soul AI'}: {msg.text}</Typography>
              <Typography variant="caption">{msg.time}</Typography>
              {!msg.user && (
                <div className="feedback-buttons">
                  <IconButton>
                    <ThumbUpIcon />
                  </IconButton>
                  <IconButton onClick={() => handleThumbsDown(index)}>
                    <ThumbDownIcon />
                  </IconButton>
                </div>
              )}
              {msg.feedback && (
                <Box mt={1}>
                  <Typography variant="body2">Feedback: {msg.feedback.text}</Typography>
                  <Rating value={msg.feedback.rating} readOnly />
                </Box>
              )}
            </Box>
          </div>
        ))}
      </Paper>
      <Box mt={3} display="flex" width="80%" alignItems="center">
        <TextField value={input} onChange={(e) => setInput(e.target.value)} fullWidth />
        <Button onClick={handleSend} variant="contained" color="primary" style={{ marginLeft: 10 }}>Ask</Button>
        <Button onClick={saveConversation} variant="contained" color="secondary" style={{ marginLeft: 10 }}>
          Save
        </Button>
      </Box>

      <Dialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)}>
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <TextField
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Enter your feedback"
            multiline
            fullWidth
          />
          <Rating
            value={feedbackRating}
            onChange={(e, newValue) => setFeedbackRating(newValue)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackOpen(false)}>Cancel</Button>
          <Button onClick={handleFeedbackSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatBox;
