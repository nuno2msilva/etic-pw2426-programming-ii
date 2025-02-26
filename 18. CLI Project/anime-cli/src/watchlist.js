// watchlist.js
import fs from 'fs';
import { searchAnime } from './animeSearch.js';

const WATCHLIST_FILE = 'watchlist.json';

// Create watchlist file if it doesn't exist
const initializeWatchlist = () => {
  if (!fs.existsSync(WATCHLIST_FILE)) {
    fs.writeFileSync(WATCHLIST_FILE, JSON.stringify([], null, 2));
    return `Created ${WATCHLIST_FILE} successfully.`; // Return success message
  }
  return null; // No message if file already exists
};

// Append anime to watchlist
const addAnimeToWatchlist = (anime) => {
  const initMessage = initializeWatchlist();

  const watchlist = JSON.parse(fs.readFileSync(WATCHLIST_FILE, 'utf-8'));
  watchlist.push(anime);
  fs.writeFileSync(WATCHLIST_FILE, JSON.stringify(watchlist, null, 2));

  return initMessage || `Added "${anime.title}" to watchlist.`; // Return appropriate message
};

// Load and validate the watchlist
const loadWatchlist = () => {
  if (!fs.existsSync(WATCHLIST_FILE)) {
    throw new Error('Watchlist file does not exist. Use the --watchlist flag after adding anime.');
  }

  const watchlistData = fs.readFileSync(WATCHLIST_FILE, 'utf-8');
  if (!watchlistData.trim()) {
    throw new Error('Watchlist file is empty. Add anime to the watchlist first.');
  }

  try {
    const watchlist = JSON.parse(watchlistData);
    if (!Array.isArray(watchlist)) {
      throw new Error('Watchlist file is malformed. Expected an array of anime.');
    }
    return watchlist;
  } catch (error) {
    throw new Error('Watchlist file is malformed. Invalid JSON format.');
  }
};

// Refresh anime data in the watchlist
const refreshWatchlist = async () => {
  const watchlist = loadWatchlist();
  const updatedWatchlist = [];

  for (const anime of watchlist) {
    try {
      const [latestAnime] = await searchAnime(anime.title); // Fetch latest data
      if (latestAnime) {
        updatedWatchlist.push(latestAnime); // Add updated anime data
      } else {
        updatedWatchlist.push(anime); // Keep old data if no update found
      }
    } catch (error) {
      console.error(`Failed to update "${anime.title}": ${error.message}`);
      updatedWatchlist.push(anime); // Keep old data if update fails
    }
  }

  fs.writeFileSync(WATCHLIST_FILE, JSON.stringify(updatedWatchlist, null, 2));
  return 'Watchlist refreshed successfully.';
};

// Remove an anime from the watchlist
const removeAnimeFromWatchlist = (index) => {
  const watchlist = loadWatchlist();
  if (index < 0 || index >= watchlist.length) {
    throw new Error('Invalid index. Anime not found in watchlist.');
  }

  const removedAnime = watchlist.splice(index, 1)[0]; // Remove anime at index
  fs.writeFileSync(WATCHLIST_FILE, JSON.stringify(watchlist, null, 2));
  return `Removed "${removedAnime.title}" from watchlist.`;
};

export { initializeWatchlist, addAnimeToWatchlist, loadWatchlist, refreshWatchlist, removeAnimeFromWatchlist };