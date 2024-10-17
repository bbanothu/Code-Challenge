// @ts-nocheck
import Nylas from 'nylas';
import { prisma } from '../prisma';


const apiUri = process.env.NYLAS_API_URI || "";
const apiKey = process.env.NYLAS_API_KEY|| "";

// Ensure clientId and accessToken are available at runtime
if (!apiUri || !apiKey) {
  throw new Error('Nylas Client ID or Access Token is missing');
}

const nylas = new Nylas({
  apiKey: apiKey,
  apiUri: apiUri
})   


// Fetch email threads and process them
export const fetchEmailThreads = async () => {
  try {
    console.log(nylas, "nylas")
    const threads = await nylas.threads.list({ limit: 10, view: 'expanded' });
    console.log(threads);
    if(threads && threads.length > 0){
      for (const thread of threads) {
        let { id, subject, messages } = thread;
  
        // Check if a ticket already exists for the thread
        let ticket = await prisma.ticket.findUnique({ where: { threadId: id } });
        subject = subject || "";
  
        if (!ticket) {
          ticket = await prisma.ticket.create({
            data: {
              threadId: id + "",
              title: subject || 'No Subject',
              status: 'open',
              priority: 'medium',
            },
          });
        }
  
        if(messages && messages.length > 0){
        // Save all messages in the thread
        for (const message of messages) {
          await prisma.message.create({
            data: {
              ticketId: ticket.id,
              body: message?.body || "",
              sender: message?.from || "",
              receivedAt: new Date(message.date || Date.now()),
            },
          });
        }

       } else {
          console.log("No messages")
        }
      }
    }  else {
      console.log("No threads")
    }
  } catch (error) {
    console.error('Failed to fetch email threads:', error);
  }
};


export const getMessagesForTicket = async (ticketId: string) => {

  // Fetch threads from the inbox
  const threads = await nylas.threads.list({ tag: 'inbox' });

  // Add type-check for `threads`
  if (threads && Array.isArray(threads)) {
    const relevantMessages = threads.filter(thread => thread.id === ticketId);
    return relevantMessages;
  }

  return []; // Return an empty array if threads are undefined or invalid
};