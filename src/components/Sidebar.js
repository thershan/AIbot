import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import logo from '../assets/logo.png'; // Adjust the path according to your project structure

const Sidebar = ({ conversations, selectConversation }) => {
  return (
    <Box width="250px" bgcolor="primary.main" color="white" height="100vh">
      <Box p={2} display="flex" alignItems="center">
        <img src={logo} alt="Bot AI" style={{ width: 50, marginRight: 10 }} />
        <Typography variant="h6">Bot AI</Typography>
      </Box>
      <Box p={2}>
        <Typography variant="body1">Past Conversations</Typography>
        <List>
          {conversations.length > 0 ? (
            conversations.map((conversation, index) => (
              <ListItem key={index} button onClick={() => selectConversation(index)}>
                <ListItemText primary={`Conversation ${index + 1}`} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No past conversations" />
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
