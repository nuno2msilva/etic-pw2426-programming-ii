import { handleCli } from './cliHandlers.js';
import process from "node:process";

// Get search query from command line argument
const query = process.argv.slice(2).join(' ');

// Start CLI process
handleCli(query);