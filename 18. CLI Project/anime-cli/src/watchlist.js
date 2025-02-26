// watchlist.js
import fs from 'fs';
import path from 'path';

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

export { initializeWatchlist, addAnimeToWatchlist };