import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Typography } from '@mui/material';
import TicketList from './components/TicketList';
import TicketDetails from './components/TicketDetails';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg" style={{ padding: '2rem' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Ticket Support Platform
        </Typography>
        <Routes>
          <Route path="/" element={<TicketList />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

