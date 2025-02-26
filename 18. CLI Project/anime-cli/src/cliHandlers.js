// cliHandlers.js
import { searchAnime } from './animeSearch.js';
import { handleError } from './utils.js';
import readline from 'readline';

// Constants
const RESULTS_PER_PAGE = 9;

// Display anime results for a specific page
const displayPage = (animeInstances, page, totalPages) => {
  console.clear(); // Clear the console for a clean display
  console.log(`Page ${page + 1} of ${totalPages}\n`);

  const start = page * RESULTS_PER_PAGE;
  const end = start + RESULTS_PER_PAGE;
  animeInstances.slice(start, end).forEach((anime, index) => {
    console.log(`${index + 1}. ${anime.title}`); // Reset numbering to 1–9 for each page
  });

  console.log('\nUse ← and → to navigate, or press "q" to quit.');
};

// Handle keyboard input for pagination
const setupKeyboardNavigation = (animeInstances, totalPages) => {
  let currentPage = 0;

  // Display the first page
  displayPage(animeInstances, currentPage, totalPages);

  // Set up keyboard input
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', (str, key) => {
    if (key.name === 'q') {
      console.log('\nExiting...');
      process.exit(0);
    }

    if (key.name === 'right' && currentPage < totalPages - 1) {
      currentPage++;
      displayPage(animeInstances, currentPage, totalPages);
    }

    if (key.name === 'left' && currentPage > 0) {
      currentPage--;
      displayPage(animeInstances, currentPage, totalPages);
    }
  });
};

// Main CLI handler
export const handleCli = async (query) => {
  try {
    if (!query) {
      throw new Error('Usage: node index.js <anime-name>');
    }

    // Fetch anime data
    const animeInstances = await searchAnime(query);

    if (animeInstances.length === 0) {
      console.log('No results found.');
      process.exit(0);
    }

    // Calculate total pages
    const totalPages = Math.ceil(animeInstances.length / RESULTS_PER_PAGE);

    // Set up pagination and keyboard navigation
    setupKeyboardNavigation(animeInstances, totalPages);
  } catch (error) {
    // Handle errors globally
    console.error(handleError(error));
  }
};