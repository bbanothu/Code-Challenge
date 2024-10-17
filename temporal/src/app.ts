import express from 'express';
import ticketRoutes from './routes/ticketRoutes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

// Ticket-related routes
app.use('/api/tickets', ticketRoutes);

app.get('/callback', (req, res) => {
  const { code } = req.query;
  res.json({ code });
});

export default app;


