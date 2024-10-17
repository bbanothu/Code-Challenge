import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { fetchTickets } from '../api/tickets';
import { useNavigate } from 'react-router-dom';

const TicketList = () => {

  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets().then(setTickets);
  }, []);

  const handleViewDetails = (id: string) => {
    navigate(`/ticket/${id}`);
  };


  console.log(tickets)
  return (
    <>
      {tickets && tickets.length > 0 ?
        <TableContainer component={Paper}>
          <Typography variant="h5" component="h2" style={{ margin: '1rem' }}>
            Ticket List
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.assignee?.name || 'Unassigned'}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>{ticket.priority}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewDetails(ticket.id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        :
        <Typography variant="h5" component="h2" style={{ margin: '1rem' }}>
          Ticket List
        </Typography>

      }
    </>
  );
};

export default TicketList;
