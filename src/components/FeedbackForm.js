import React, { useState } from 'react';
import { Button, TextField, Rating, Paper, Typography } from '@mui/material';

const FeedbackForm = ({ conversationId, submitFeedback }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    submitFeedback({ conversationId, rating, comments });
    setRating(0);
    setComments('');
  };

  return (
    <Paper className="feedback-form">
      <Typography variant="h6">Rate the conversation</Typography>
      <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} />
      <TextField
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Your feedback"
        multiline
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
    </Paper>
  );
};

export default FeedbackForm;
