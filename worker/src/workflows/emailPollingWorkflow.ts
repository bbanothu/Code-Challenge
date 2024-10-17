import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities/activities';

const { fetchEmails } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute'
});

export async function emailPollingWorkflow(): Promise<void> {
  try {
    while (true) {
      console.log("fetchEmails");
      await fetchEmails();
      console.log("fetchEmails Done")

      // try {
      //   await sleep('5 minutes');
      // } catch (err) {
      //   if (isCancellation(err)) {
      //     console.log('Workflow cancelled, shutting down gracefully');
      //     return;
      //   }
      //   throw err;
      // }
    }
  } catch (error) {
    console.error('Error in email polling workflow:', error);
    throw error;
  }
}