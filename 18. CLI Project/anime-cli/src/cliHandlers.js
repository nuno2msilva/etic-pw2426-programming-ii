// cliHandlers.js
import { searchAnime, searchAnimeByGenre, fetchGenres } from './animeSearch.js';
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
    console.log(`${index + 1}. ${anime.title} - Score: ${anime.score}`);
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

// Display all available genres as a comma-separated list
const displayGenres = async () => {
  try {
    const genres = await fetchGenres();
    const genreNames = genres.map((genre) => genre.name).join(', ');
    console.log(`Available Genres: ${genreNames}`);
  } catch (error) {
    console.error(handleError(error));
  }
};

// Parse command-line arguments manually
const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsedArgs = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--genres') {
      // Treat everything after --genres as part of the genre list
      const genreList = [];
      i += 1;

      // Collect all arguments until the next flag or end of args
      while (i < args.length && !args[i].startsWith('--')) {
        genreList.push(args[i]);
        i += 1;
      }

      if (genreList.length === 0) {
        parsedArgs.genres = true; // Flag to display all genres
      } else {
        // Join the genre list with spaces and split by "/"
        const genres = genreList.join(' ').split('/').map((genre) => genre.trim());

        // Limit to 2 genres
        if (genres.length > 2) {
          throw new Error('Please provide up to 2 genres separated by "/".');
        }

        parsedArgs.genres = genres;
      }

      // Adjust the index to account for the loop increment
      i -= 1;
    }
  }

  return parsedArgs;
};

// Main CLI handler
export const handleCli = async () => {
  try {
    const args = parseArgs();

    // Check if the user wants to display genres or search by genre
    if (args.genres) {
      if (args.genres === true) {
        // Display all genres
        await displayGenres();
      } else {
        // Search by genre(s)
        const genres = await fetchGenres();
        const selectedGenres = args.genres.map((genreName) => {
          const genre = genres.find((g) => g.name.toLowerCase() === genreName.toLowerCase());
          if (!genre) {
            throw new Error(`Invalid genre: "${genreName}". Use --genres to see available genres.`);
          }
          return genre;
        });

        const animeInstances = await searchAnimeByGenre(selectedGenres);
        if (animeInstances.length === 0) {
          throw new Error(`No results found for the genre(s): ${args.genres.join('/')}.`);
        }

        const totalPages = Math.ceil(animeInstances.length / RESULTS_PER_PAGE);
        setupKeyboardNavigation(animeInstances, totalPages);
      }
      process.exit(0);
    }
    // Default: Search by query
    else {
      const query = process.argv.slice(2).join(' ');
      if (!query) {
        throw new Error('Usage: node index.js <anime-name>');
      }

      const animeInstances = await searchAnime(query);
      if (animeInstances.length === 0) {
        throw new Error('No results found for the specified query.');
      }

      const totalPages = Math.ceil(animeInstances.length / RESULTS_PER_PAGE);
      setupKeyboardNavigation(animeInstances, totalPages);
    }
  } catch (error) {
    console.error(handleError(error));
    process.exit(1);
  }
};