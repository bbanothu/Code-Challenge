import app from './app';
import { startEmailPollingWorkflow } from './services/temporalService';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  startEmailPollingWorkflow();
});
