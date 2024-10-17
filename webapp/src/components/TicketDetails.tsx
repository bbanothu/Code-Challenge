import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTicketMessages, updateTicket } from '../api/tickets';
import { Typography, Paper, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<any>({});
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    fetchTicketMessages(id).then((data) => {
      setTicket(data.ticket);
      setMessages(data.messages);
      setStatus(data.ticket.status);
      setPriority(data.ticket.priority);
    });
  }, [id]);

  const handleUpdate = () => {
    updateTicket(id, { status, priority }).then(() => {
      alert('Ticket updated successfully!');
    });
  };

  return (
    <Paper style={{ padding: '2rem' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Ticket #{id} Details
      </Typography>

      <Grid container spacing={2} style={{ marginBottom: '1rem' }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginBottom: '1rem' }}>
        Update Ticket
      </Button>

      <Typography variant="h5" component="h3" gutterBottom>
        Messages
      </Typography>
      {messages.map((message, index) => (
        <Paper key={index} style={{ padding: '1rem', marginBottom: '1rem' }}>
          <Typography>{message.content}</Typography>
        </Paper>
      ))}
    </Paper>
  );
};

export default TicketDetails;
