import { Router } from 'express';
import { getAllTickets, updateTicket, getTicketMessages } from '../controllers/ticketController';

const router = Router();

router.get('/', getAllTickets);
router.get('/:id/messages', getTicketMessages);
router.put('/:id', updateTicket);

export default router;
