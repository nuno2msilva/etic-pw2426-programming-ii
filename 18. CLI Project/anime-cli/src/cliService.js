import readline from 'readline';
import { Anime } from './Anime.js';
import { searchAnime, searchAnimeByGenre, fetchGenres, fetchCurrentSeason } from './apiService.js';
import { addAnimeToWatchlist, loadWatchlist, refreshWatchlist, removeAnimeFromWatchlist } from './watchlistService.js';
import { handleError } from './errorHandler.js';

// Constants
const RESULTS_PER_PAGE = 9;
const FETCH_CHUNK_SIZE = 18;
const MAX_RESULTS = 81;

// Display anime results for a specific page
const displayPage = (animeInstances, page, totalPages) => {
  console.clear();
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
  console.clear();
  console.log(`Name: ${anime.title}`);
  console.log(`Genres: ${anime.genres.join(', ')}`);
  console.log(`Episodes: ${anime.episodes || 'Unknown (Ongoing)'}`);
  console.log(`Status: ${anime.status}`);
  console.log(`Duration: ${anime.duration}`);
  console.log(`Broadcast Day: ${anime.broadcastDay || 'Unknown'}`);
  console.log(`Season: ${anime.season || 'Unknown'}`);
  console.log(`Studios: ${anime.studios.join(', ')}`);
  console.log('\nAdd this anime to your watchlist? (y/n/q)');

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
      process.exit(0);
    }
    displayPage(animeInstances, currentPage, totalPages);
  });
};

// Display detailed anime information for watchlist entries
const displayAnimeInfoForWatchlist = (anime, watchlist, currentIndex) => {
  console.clear();
  console.log(`Name: ${anime.title}`);
  console.log(`Genres: ${anime.genres.join(', ')}`);
  console.log(`Episodes: ${anime.episodes || 'Unknown (Ongoing)'}`);
  console.log(`Status: ${anime.status}`);
  console.log(`Duration: ${anime.duration}`);
  console.log(`Broadcast Day: ${anime.broadcastDay || 'Unknown'}`);
  console.log(`Season: ${anime.season || 'Unknown'}`);
  console.log(`Studios: ${anime.studios.join(', ')}`);
  console.log('\nUse ← and → to navigate, "d" to delete, or "q" to quit.');

  process.stdin.removeAllListeners('keypress');
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  const onKeyPress = (str, key) => {
    if (key.name === 'q') process.exit(0);

    // Navigation
    if (key.name === 'left' && currentIndex > 0) {
      currentIndex--;
      displayAnimeInfoForWatchlist(watchlist[currentIndex], watchlist, currentIndex);
    }
    if (key.name === 'right' && currentIndex < watchlist.length - 1) {
      currentIndex++;
      displayAnimeInfoForWatchlist(watchlist[currentIndex], watchlist, currentIndex);
    }

    // Delete handling
    if (key.name === 'd') {
      process.stdin.off('keypress', onKeyPress);
      console.log('\nAre you sure you want to delete this anime? (y/n)');
      
      process.stdin.once('keypress', (confirmStr, confirmKey) => {
        if (confirmKey.name === 'y') {
          try {
            const message = removeAnimeFromWatchlist(currentIndex);
            console.log(message);
            
            const updatedWatchlist = loadWatchlist();
            if (updatedWatchlist.length === 0) {
              console.log('Watchlist is now empty. Exiting...');
              process.exit(0);
            }
            
            const newIndex = currentIndex >= updatedWatchlist.length 
              ? updatedWatchlist.length - 1 
              : currentIndex;
            displayAnimeInfoForWatchlist(updatedWatchlist[newIndex], updatedWatchlist, newIndex);
          } catch (error) {
            console.error(handleError(error));
            process.exit(1);
          }
        } else {
          process.stdin.on('keypress', onKeyPress);
          displayAnimeInfoForWatchlist(watchlist[currentIndex], watchlist, currentIndex);
        }
      });
    }
  };

  process.stdin.on('keypress', onKeyPress);
};

// Handle keyboard input for pagination
const setupKeyboardNavigationForSearch = (animeInstances, totalPages, fetchMore) => {
  let currentPage = 0;

  displayPage(animeInstances, currentPage, totalPages);

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', async (str, key) => {
    if (key.name === 'q') process.exit(0);

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

    if (key.name === 'right' &&
        currentPage === totalPages - 1 &&
        fetchMore &&
        animeInstances.length >= RESULTS_PER_PAGE &&
        animeInstances.length < MAX_RESULTS) {
      const newAnimeInstances = await fetchMore(animeInstances.length);
      if (newAnimeInstances.length > 0) {
        animeInstances.push(...newAnimeInstances);
        if (animeInstances.length > MAX_RESULTS) {
          animeInstances = animeInstances.slice(0, MAX_RESULTS);
        }
        totalPages = Math.ceil(animeInstances.length / RESULTS_PER_PAGE);
        displayPage(animeInstances, currentPage, totalPages);
      }
    }

    if (key.name && /^[1-9]$/.test(key.name)) {
      const index = currentPage * RESULTS_PER_PAGE + (parseInt(key.name) - 1);
      if (index < animeInstances.length) {
        displayAnimeInfoForSearch(animeInstances[index], animeInstances, currentPage, totalPages, fetchMore);
      }
    }
  });
};

// Display all available genres
export const displayGenres = async () => {
  try {
    const genres = await fetchGenres();
    const genreNames = genres.map((genre) => genre.name).join(', ');
    console.log(`Available Genres: ${genreNames}`);
  } catch (error) {
    console.error(handleError(error));
  }
};

// Display current season
export const displayCurrentSeason = async () => {
  try {
    let animeInstances = await fetchCurrentSeason();
    if (animeInstances.length === 0) {
      throw new Error('No results found for the current season.');
    }

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

// Display watchlist
export const displayWatchlist = async () => {
  try {
    let watchlist = loadWatchlist();
    if (watchlist.length === 0) {
      throw new Error('Watchlist is empty. Add anime to the watchlist first.');
    }

    let currentIndex = 0;
    displayAnimeInfoForWatchlist(watchlist[currentIndex], watchlist, currentIndex);
  } catch (error) {
    console.error(handleError(error));
    process.exit(1);
  }
};

// Help information
const displayHelp = () => {
  console.log(`
Usage: node index.js [options]

Options:
  name <anime-name>       Search for anime by name
  genres <genre1/genre2>  Search by genre(s) (max 2)
  season                  Show current season
  watchlist               Manage your watchlist
  refresh                 Refresh watchlist data
  help                    Show this help message

Examples:
  node index.js name Attack on Titan
  node index.js genres "Action/Drama"
  node index.js season
  node index.js watchlist
  node index.js refresh
  `);
};

// Argument parser
export const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsedArgs = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--genres') {
      const genreList = [];
      i += 1;
      while (i < args.length && !args[i].startsWith('--')) {
        genreList.push(args[i]);
        i += 1;
      }
      if (genreList.length === 0) {
        parsedArgs.genres = true;
      } else {
        const genres = genreList.join(' ').split('/').map(g => g.trim());
        if (genres.length > 2) throw new Error('Maximum 2 genres allowed');
        parsedArgs.genres = genres;
      }
      i -= 1;
    } else if (args[i] === 'season') {
      parsedArgs.season = true;
    } else if (args[i] === 'name') {
      parsedArgs.name = args.slice(i + 1).join(' ');
      break;
    } else if (args[i] === 'watchlist') {
      parsedArgs.watchlist = true;
    } else if (args[i] === 'refresh') {
      parsedArgs.refresh = true;
    } else if (args[i] === 'help') {
      parsedArgs.help = true;
    }
  }

  return parsedArgs;
};

// Main CLI handler
export const handleCli = async () => {
  try {
    const args = parseArgs();

    if (args.help) {
      displayHelp();
      return;
    }

    if (args.refresh) {
      const message = await refreshWatchlist();
      console.log(message);
      return;
    }

    if (args.watchlist) {
      await displayWatchlist();
      return;
    }

    if (args.season) {
      await displayCurrentSeason();
      return;
    }

    if (args.genres) {
      if (args.genres === true) {
        await displayGenres();
      } else {
        const genres = await fetchGenres();
        const selectedGenres = args.genres.map(genreName => {
          const genre = genres.find(g => g.name.toLowerCase() === genreName.toLowerCase());
          if (!genre) throw new Error(`Invalid genre: "${genreName}"`);
          return genre;
        });

        let animeInstances = await searchAnimeByGenre(selectedGenres);
        if (animeInstances.length === 0) {
          throw new Error(`No results for: ${args.genres.join('/')}`);
        }

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
      return;
    }

    if (args.name) {
      let animeInstances = await searchAnime(args.name);
      if (animeInstances.length === 0) {
        throw new Error('No results found');
      }

      if (animeInstances.length > MAX_RESULTS) {
        animeInstances = animeInstances.slice(0, MAX_RESULTS);
      }

      const fetchMore = async (offset) => {
        if (offset >= MAX_RESULTS) return [];
        return await searchAnime(args.name, offset);
      };

      const totalPages = Math.ceil(animeInstances.length / RESULTS_PER_PAGE);
      setupKeyboardNavigationForSearch(animeInstances, totalPages, fetchMore);
    } else {
      displayHelp();
    }
  } catch (error) {
    console.error(handleError(error));
    process.exit(1);
  }
};