import { Connection, WorkflowClient } from '@temporalio/client';

export const startEmailPollingWorkflow = async () => {
  const connection = await Connection.connect({
    address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',  // Use environment variable or default to localhost:7233
  });
    const client = new WorkflowClient({ connection });


  const handle = await client.start('emailPollingWorkflow', {
    taskQueue: 'nylas-email-polling',
    workflowId: 'polling-workflow'
  });

  console.log(`Started workflow ${handle.workflowId}`);
};
