import { handleCli } from './cliService.js';

// Start the CLI process and catch all errors
(async () => {
  try {
    await handleCli();
  } catch (error) {
    console.error(`An unexpected error occurred: ${error.message}`);
    process.exit(1);
  }
})();