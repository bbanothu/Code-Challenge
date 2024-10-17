import { Worker } from '@temporalio/worker';
import * as activities from './activities/activities';

console.log("Started Worker");
async function createWorkerWithRetry(retryDelay = 60000) { // Default retry delay is 1 minute (60000 ms)
  try {
    console.log("Attempting to create a worker...");

    const worker = await Worker.create({
      workflowsPath: require.resolve('./workflows/emailPollingWorkflow'),
      activities,
      taskQueue: 'nylas-email-polling',
    });

    console.log('Worker connected, listening to task queue "nylas-email-polling"');
    
    // Once the worker is connected, run it
    await worker.run();

  } catch (error) {
    console.error("Failed to create worker:", error);

    console.log(`Retrying in ${retryDelay / 1000} seconds...`);
    const newRetryDelay = Math.min(retryDelay * 2, 15 * 60 * 1000); // Cap retry delay to 15 minutes
    setTimeout(() => createWorkerWithRetry(newRetryDelay), retryDelay);
  }
}

// Start the worker with retry logic
createWorkerWithRetry();
