// cliHandlers.js
import { searchAnime, searchAnimeByGenre, fetchGenres, fetchCurrentSeason } from './animeSearch.js';
import { handleError } from './utils.js';
import { addAnimeToWatchlist, loadWatchlist } from './watchlist.js';
import readline from 'readline';

// Display detailed anime information
const displayAnimeInfo = (anime) => {
  console.clear(); // Clear the console for a clean display
  console.log(`Name: ${anime.title}`);
  console.log(`Genres: ${anime.genres.join(', ')}`);
  console.log(`Episodes: ${anime.episodes || 'Unknown (Ongoing)'}`); // Handle null episodes
  console.log(`Status: ${anime.status}`);
  console.log(`Duration: ${anime.duration}`);
  console.log(`Broadcast Day: ${anime.broadcastDay || 'Unknown'}`); // Handle null broadcastDay
  console.log(`Season: ${anime.season || 'Unknown'}`); // Handle null season
  console.log(`Studios: ${anime.studios.join(', ')}`);
  console.log('\nUse ← and → to navigate, or press "q" to quit.');
};

// Display the watchlist and navigate through details
const displayWatchlist = async () => {
  try {
    const watchlist = loadWatchlist(); // Load and validate the watchlist
    if (watchlist.length === 0) {
      throw new Error('Watchlist is empty. Add anime to the watchlist first.');
    }

    let currentIndex = 0;

    // Display the first anime's details
    displayAnimeInfo(watchlist[currentIndex]);

    // Set up keyboard input
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str, key) => {
      if (key.name === 'q') {
        console.log('\nExiting...');
        process.exit(0);
      }

      // Navigate to the previous anime
      if (key.name === 'left' && currentIndex > 0) {
        currentIndex--;
        displayAnimeInfo(watchlist[currentIndex]);
      }

      // Navigate to the next anime
      if (key.name === 'right' && currentIndex < watchlist.length - 1) {
        currentIndex++;
        displayAnimeInfo(watchlist[currentIndex]);
      }
    });
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
    }
  }

  return parsedArgs;
};

// Main CLI handler
export const handleCli = async () => {
  try {
    const args = parseArgs();

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

        const totalPages = Math.ceil(animeInstances.length / RESULTS_PER_PAGE);
        setupKeyboardNavigation(animeInstances, totalPages);
      }
      return; // Don't exit, let pagination handle it
    }
    // Check if the user wants to search by name
    else if (args.name) {
      let animeInstances = await searchAnime(args.name);
      if (animeInstances.length === 0) {
        throw new Error('No results found for the specified query.');
      }

      const totalPages = Math.ceil(animeInstances.length / RESULTS_PER_PAGE);
      setupKeyboardNavigation(animeInstances, totalPages);
    }
    // No valid flag provided
    else {
      throw new Error('Usage: node index.js --name <anime-name> or --genres <genre1/genre2> or --season or --watchlist');
    }
  } catch (error) {
    console.error(handleError(error));
    process.exit(1);
  }
};