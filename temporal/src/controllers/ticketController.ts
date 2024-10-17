import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { getMessagesForTicket } from '../services/nylasService';

// Get all tickets
export const getAllTickets = async (req: Request, res: Response) => {
  const tickets = await prisma.ticket.findMany({
    where: { status: { not: 'done' } }
  });
  res.json(tickets);
};

// Get messages for a specific ticket
export const getTicketMessages = async (req: Request, res: Response) => {
  const ticketId = req.params.id;
  const messages = await getMessagesForTicket(ticketId);
  res.json({ ticketId, messages });
};

// Update a ticket
export const updateTicket = async (req: Request, res: Response) => {
  const ticketId = req.params.id;
  const { status, priority, assigneeId } = req.body;

  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: { status, priority, assigneeId }
  });

  res.json(updatedTicket);
};
