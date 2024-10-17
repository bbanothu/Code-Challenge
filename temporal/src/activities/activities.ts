import { fetchEmailThreads } from '../../../temporal/src/services/nylasService';

export async function fetchEmails(): Promise<void> {
  console.log("Starting to fetch email threads");
  try {
    await fetchEmailThreads();
    console.log("Successfully fetched email threads");
  } catch (error) {
    console.error("Error fetching email threads:", error);
    throw error;  // Re-throw the error so Temporal can handle it
  }
}