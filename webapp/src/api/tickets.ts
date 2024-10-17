import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
});

export const fetchTickets = async () => {
  const response = await apiClient.get('/api/tickets');
  return response.data;
};

export const fetchTicketMessages = async (ticketId: string) => {
  const response = await apiClient.get(`/api/tickets/${ticketId}/messages`);
  return response.data;
};

export const updateTicket = async (ticketId: string, data: { status: string; priority: string }) => {
  const response = await apiClient.put(`/api/tickets/${ticketId}`, data);
  return response.data;
};
