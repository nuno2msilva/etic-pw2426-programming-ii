// cliHandlers.js
import { searchAnime, searchAnimeByGenre, fetchGenres, fetchCurrentSeason } from './animeSearch.js';
import { handleError } from './utils.js';
import { addAnimeToWatchlist, loadWatchlist, refreshWatchlist, removeAnimeFromWatchlist } from './watchlist.js';
import readline from 'readline';

// Constants
const RESULTS_PER_PAGE = 9;
const FETCH_CHUNK_SIZE = 18; // Fetch 18 results at a time (2 pages of 9)
const MAX_RESULTS = 81; // Limit to 81 results (9 pages of 9)

// Display anime results for a specific page
const displayPage = (animeInstances, page, totalPages) => {
  console.clear(); // Clear the console for a clean display
  console.log(`Page ${page + 1} of ${totalPages}\n`);

  const start = page * RESULTS_PER_PAGE;
  const end = start + RESULTS_PER_PAGE;
  animeInstances.slice(start, end).forEach((anime, index) => {
    console.log(`(${index + 1}) ${anime.title}`);
  });

  console.log('\nUse ← and → to navigate, 1-9 to open info of listed anime, or press "q" to quit.');
};

// Display detailed anime information for search results
const displayAnimeInfoForSearch = (anime, animeInstances, currentPage, totalPages, fetchMore) => {
  console.clear(); // Clear the console for a clean display
  console.log(`Name: ${anime.title}`);
  console.log(`Genres: ${anime.genres.join(', ')}`);
  console.log(`Episodes: ${anime.episodes || 'Unknown (Ongoing)'}`); // Handle null episodes
  console.log(`Status: ${anime.status}`);
  console.log(`Duration: ${anime.duration}`);
  console.log(`Broadcast Day: ${anime.broadcastDay || 'Unknown'}`); // Handle null broadcastDay
  console.log(`Season: ${anime.season || 'Unknown'}`); // Handle null season
  console.log(`Studios: ${anime.studios.join(', ')}`);
  console.log('\nAdd this anime to your watchlist? (y/n/q)');

  // Set up keyboard input
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.once('keypress', (str, key) => {
    if (key.name === 'y') {
      const message = addAnimeToWatchlist(anime);
      console.log(message);
      console.log('Returning to the list...');
    } else if (key.name === 'n') {
      console.log('Returning to the list...');
    } else if (key.name === 'q') {
      console.log('\nExiting...');
      process.exit(0);
    }

    // Return to the list after handling the keypress
    displayPage(animeInstances, currentPage, totalPages);
  });
};

// Display detailed anime information for watchlist
const displayAnimeInfoForWatchlist = (anime, watchlist, currentIndex) => {
  console.clear(); // Clear the console for a clean display
  console.log(`Name: ${anime.title}`);
  console.log(`Genres: ${anime.genres.join(', ')}`);
  console.log(`Episodes: ${anime.episodes || 'Unknown (Ongoing)'}`); // Handle null episodes
  console.log(`Status: ${anime.status}`);
  console.log(`Duration: ${anime.duration}`);
  console.log(`Broadcast Day: ${anime.broadcastDay || 'Unknown'}`); // Handle null broadcastDay
  console.log(`Season: ${anime.season || 'Unknown'}`); // Handle null season
  console.log(`Studios: ${anime.studios.join(', ')}`);
  console.log('\nUse ← and → to navigate, "d" to delete, or "q" to quit.');

  // Set up keyboard input
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.once('keypress', (str, key) => {
    if (key.name === 'q') {
      console.log('\nExiting...');
      process.exit(0);
    }

    // Navigate to the previous anime
    if (key.name === 'left' && currentIndex > 0) {
      currentIndex--;
      displayAnimeInfoForWatchlist(watchlist[currentIndex], watchlist, currentIndex);
    }

    // Navigate to the next anime
    if (key.name === 'right' && currentIndex < watchlist.length - 1) {
      currentIndex++;
      displayAnimeInfoForWatchlist(watchlist[currentIndex], watchlist, currentIndex);
    }

    // Delete the current anime
    if (key.name === 'd') {
      console.log('\nAre you sure you want to delete this anime? (y/n)');
      process.stdin.once('keypress', (confirmStr, confirmKey) => {
        if (confirmKey.name === 'y') {
          const message = removeAnimeFromWatchlist(currentIndex); // Remove anime
          console.log(message);

          // Reload the watchlist and adjust the current index
          watchlist = loadWatchlist();
          if (watchlist.length === 0) {
            console.log('Watchlist is now empty. Exiting...');
            process.exit(0);
          }

          if (currentIndex >= watchlist.length) {
            currentIndex = watchlist.length - 1; // Adjust index if last anime was deleted
          }

          displayAnimeInfoForWatchlist(watchlist[currentIndex], watchlist, currentIndex); // Display updated anime
        } else {
          displayAnimeInfoForWatchlist(watchlist[currentIndex], watchlist, currentIndex); // Return to anime details
        }
      });
    }
  });
};

// Handle keyboard input for pagination and anime info (for search results)
const setupKeyboardNavigationForSearch = (animeInstances, totalPages, fetchMore) => {
  let currentPage = 0;

  // Display the first page
  displayPage(animeInstances, currentPage, totalPages);

  // Set up keyboard input
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', async (str, key) => {
    if (key.name === 'q') {
      console.log('\nExiting...');
      process.exit(0);
    }

    // Navigate pages (only if there are multiple pages)
    if (totalPages > 1) {
      if (key.name === 'right' && currentPage < totalPages - 1) {
        currentPage++;
        displayPage(animeInstances, currentPage, totalPages);
      }

      if (key.name === 'left' && currentPage > 0) {
        currentPage--;
        displayPage(animeInstances, currentPage, totalPages);
      }
    }

    // Load more results if at the end of the current list and there are 9 or more results
    if (
      key.name === 'right' &&
      currentPage === totalPages - 1 &&
      fetchMore &&
      animeInstances.length >= RESULTS_PER_PAGE
    ) {
      if (animeInstances.length >= MAX_RESULTS) {
        console.log('\nNo more results available.');
        return;
      }

      const newAnimeInstances = await fetchMore(animeInstances.length);
      if (newAnimeInstances.length > 0) {
        animeInstances.push(...newAnimeInstances);

        // Enforce the hard limit of 81 results
        if (animeInstances.length > MAX_RESULTS) {
          animeInstances = animeInstances.slice(0, MAX_RESULTS);
        }

        totalPages = Math.ceil(animeInstances.length / RESULTS_PER_PAGE);
        displayPage(animeInstances, currentPage, totalPages); // Stay on the same page
      } else {
        console.log('\nNo more results available.');
      }
    }

    // Open anime info if a number key is pressed
    if (key.name && /^[1-9]$/.test(key.name)) {
      const index = currentPage * RESULTS_PER_PAGE + (parseInt(key.name) - 1);
      if (index < animeInstances.length) {
        displayAnimeInfoForSearch(animeInstances[index], animeInstances, currentPage, totalPages, fetchMore);
      }
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

// Display the current anime season, ordered by ranking
const displayCurrentSeason = async () => {
  try {
    let animeInstances = await fetchCurrentSeason();
    if (animeInstances.length === 0) {
      throw new Error('No results found for the current season.');
    }

    // Enforce the hard limit of 81 results
    if (animeInstances.length > MAX_RESULTS) {
      animeInstances = animeInstances.slice(0, MAX_RESULTS);
    }

    const fetchMore = async (offset) => {
      if (offset >= MAX_RESULTS) return [];
      return await fetchCurrentSeason(offset);
    };

    const totalPages = Math.ceil(animeInstances.length / RESULTS_PER_PAGE);
    setupKeyboardNavigationForSearch(animeInstances, totalPages, fetchMore);
  } catch (error) {
    console.error(handleError(error));
  }
};

// Display the watchlist and navigate through details
const displayWatchlist = async () => {
  try {
    let watchlist = loadWatchlist(); // Load and validate the watchlist
    if (watchlist.length === 0) {
      throw new Error('Watchlist is empty. Add anime to the watchlist first.');
    }

    let currentIndex = 0;

    // Display the first anime's details
    displayAnimeInfoForWatchlist(watchlist[currentIndex], watchlist, currentIndex);
  } catch (error) {
    console.error(handleError(error));
    process.exit(1);
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
    } else if (args[i] === '--season') {
      parsedArgs.season = true;
    } else if (args[i] === '--name') {
      parsedArgs.name = args.slice(i + 1).join(' ');
      break; // Stop parsing after --name
    } else if (args[i] === '--watchlist') {
      parsedArgs.watchlist = true;
    } else if (args[i] === '--refresh') {
      parsedArgs.refresh = true;
    }
  }

  return parsedArgs;
};

// Main CLI handler
export const handleCli = async () => {
  try {
    const args = parseArgs();

    // Check if the user wants to refresh the watchlist
    if (args.refresh) {
      const message = await refreshWatchlist();
      console.log(message);
      return;
    }

    // Check if the user wants to display the watchlist
    if (args.watchlist) {
      await displayWatchlist();
      return; // Don't exit, let navigation handle it
    }

    // Check if the user wants to display the current season
    if (args.season) {
      await displayCurrentSeason();
      return; // Don't exit, let pagination handle it
    }

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

        let animeInstances = await searchAnimeByGenre(selectedGenres);
        if (animeInstances.length === 0) {
          throw new Error(`No results found for the genre(s): ${args.genres.join('/')}.`);
        }

        // Enforce the hard limit of 81 results
        if (animeInstances.length > MAX_RESULTS) {
          animeInstances = animeInstances.slice(0, MAX_RESULTS);
        }

        const fetchMore = async (offset) => {
          if (offset >= MAX_RESULTS) return [];
          return await searchAnimeByGenre(selectedGenres, offset);
        };

        const totalPages = Math.ceil(animeInstances.length / RESULTS_PER_PAGE);
        setupKeyboardNavigationForSearch(animeInstances, totalPages, fetchMore);
      }
      return; // Don't exit, let pagination handle it
    }
    // Check if the user wants to search by name
    else if (args.name) {
      let animeInstances = await searchAnime(args.name);
      if (animeInstances.length === 0) {
        throw new Error('No results found for the specified query.');
      }

      // Enforce the hard limit of 81 results
      if (animeInstances.length > MAX_RESULTS) {
        animeInstances = animeInstances.slice(0, MAX_RESULTS);
      }

      const fetchMore = async (offset) => {
        if (offset >= MAX_RESULTS) return [];
        return await searchAnime(args.name, offset);
      };

      const totalPages = Math.ceil(animeInstances.length / RESULTS_PER_PAGE);
      setupKeyboardNavigationForSearch(animeInstances, totalPages, fetchMore);
    }
    // No valid flag provided
    else {
      throw new Error('Usage: node index.js --name <anime-name> or --genres <genre1/genre2> or --season or --watchlist or --refresh');
    }
  } catch (error) {
    console.error(handleError(error));
    process.exit(1);
  }
};