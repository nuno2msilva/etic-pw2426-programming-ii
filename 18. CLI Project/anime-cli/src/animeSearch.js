// animeSearch.js
import fetch from 'node-fetch';

// Sacred Anime class
export class Anime {
  constructor({ title, genres, episodes, status, duration, broadcastDay, season, studios }) {
    this.title = title;
    this.genres = genres;
    this.episodes = episodes || 'Unknown (Ongoing)'; // Handle null episodes
    this.status = status;
    this.duration = duration;
    this.broadcastDay = broadcastDay || 'Unknown'; // Handle null broadcastDay
    this.season = season || 'Unknown'; // Handle null season
    this.studios = studios;
  }
}

// Search anime by query, ordered by relevance
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
    episodes: anime.episodes || 'Unknown (Ongoing)', // Handle null episodes
    status: anime.status,
    duration: anime.duration,
    broadcastDay: anime.broadcast?.day || 'Unknown', // Handle null broadcastDay
    season: anime.season && anime.year ? `${anime.season} ${anime.year}` : 'Unknown', // Handle null season
    studios: anime.studios.map((studio) => studio.name),
  }));
};

// Search anime by genre (up to 2 genres), ordered by ranking
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
    episodes: anime.episodes || 'Unknown (Ongoing)', // Handle null episodes
    status: anime.status,
    duration: anime.duration,
    broadcastDay: anime.broadcast?.day || 'Unknown', // Handle null broadcastDay
    season: anime.season && anime.year ? `${anime.season} ${anime.year}` : 'Unknown', // Handle null season
    studios: anime.studios.map((studio) => studio.name),
  }));
};

// Fetch all available genres
export const fetchGenres = async () => {
  const response = await fetch('https://api.jikan.moe/v4/genres/anime');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data;
};

// Fetch the current anime season, ordered by ranking
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
    episodes: anime.episodes || 'Unknown (Ongoing)', // Handle null episodes
    status: anime.status,
    duration: anime.duration,
    broadcastDay: anime.broadcast?.day || 'Unknown', // Handle null broadcastDay
    season: anime.season && anime.year ? `${anime.season} ${anime.year}` : 'Unknown', // Handle null season
    studios: anime.studios.map((studio) => studio.name),
  }));
};