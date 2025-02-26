import fetch from 'node-fetch';
import { Anime } from './Anime.js';

/**
 * Fetches anime data from the Jikan API based on a search query.
 * @param {string} query - The search query.
 * @param {number} offset - The offset for pagination.
 * @returns {Promise<Anime[]>} - A promise that resolves to an array of Anime instances.
 */
export const searchAnime = async (query, offset = 0) => {
  const response = await fetch(
    `https://api.jikan.moe/v4/anime?q=${query}&order_by=title&sort=asc&limit=18&page=${Math.floor(offset / 18) + 1}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data.map((anime) => new Anime({
    title: anime.title,
    genres: anime.genres.map((genre) => genre.name),
    episodes: anime.episodes,
    status: anime.status,
    duration: anime.duration,
    broadcastDay: anime.broadcast?.day || 'Unknown',
    season: anime.season && anime.year ? `${anime.season} ${anime.year}` : 'Unknown',
    studios: anime.studios.map((studio) => studio.name),
  }));
};

/**
 * Fetches anime data from the Jikan API based on genre(s).
 * @param {Object[]} genres - The genres to search for.
 * @param {number} offset - The offset for pagination.
 * @returns {Promise<Anime[]>} - A promise that resolves to an array of Anime instances.
 */
export const searchAnimeByGenre = async (genres, offset = 0) => {
  const genreIds = genres.map((genre) => genre.mal_id).join(',');
  const response = await fetch(
    `https://api.jikan.moe/v4/anime?genres=${genreIds}&order_by=score&sort=desc&limit=18&page=${Math.floor(offset / 18) + 1}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data.map((anime) => new Anime({
    title: anime.title,
    genres: anime.genres.map((genre) => genre.name),
    episodes: anime.episodes,
    status: anime.status,
    duration: anime.duration,
    broadcastDay: anime.broadcast?.day || 'Unknown',
    season: anime.season && anime.year ? `${anime.season} ${anime.year}` : 'Unknown',
    studios: anime.studios.map((studio) => studio.name),
  }));
};

/**
 * Fetches all available genres from the Jikan API.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of genre objects.
 */
export const fetchGenres = async () => {
  const response = await fetch('https://api.jikan.moe/v4/genres/anime');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data;
};

/**
 * Fetches the current anime season from the Jikan API.
 * @param {number} offset - The offset for pagination.
 * @returns {Promise<Anime[]>} - A promise that resolves to an array of Anime instances.
 */
export const fetchCurrentSeason = async (offset = 0) => {
  const response = await fetch(
    `https://api.jikan.moe/v4/seasons/now?order_by=score&sort=desc&limit=18&page=${Math.floor(offset / 18) + 1}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data.map((anime) => new Anime({
    title: anime.title,
    genres: anime.genres.map((genre) => genre.name),
    episodes: anime.episodes,
    status: anime.status,
    duration: anime.duration,
    broadcastDay: anime.broadcast?.day || 'Unknown',
    season: anime.season && anime.year ? `${anime.season} ${anime.year}` : 'Unknown',
    studios: anime.studios.map((studio) => studio.name),
  }));
};