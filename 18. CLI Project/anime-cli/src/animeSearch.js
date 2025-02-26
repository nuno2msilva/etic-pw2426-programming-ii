// animeSearch.js
import fetch from 'node-fetch';

// Sacred Anime class
export class Anime {
  constructor({ title, type, episodes, score, synopsis }) {
    this.title = title;
    this.type = type;
    this.episodes = episodes;
    this.score = score;
    this.synopsis = synopsis;
  }

  // Optional: Display anime details
  display() {
    return `${this.title} (${this.type}) - Score: ${this.score}`;
  }
}

// Search anime by query
export const searchAnime = async (query) => {
  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=25`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data.map((anime) => new Anime({
    title: anime.title,
    type: anime.type,
    episodes: anime.episodes,
    score: anime.score,
    synopsis: anime.synopsis,
  }));
};

// Search anime by genre (up to 3 genres)
export const searchAnimeByGenre = async (genres) => {
  const genreIds = genres.map((genre) => genre.id).join(',');
  const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${genreIds}&order_by=score&sort=desc&limit=25`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data.map((anime) => new Anime({
    title: anime.title,
    type: anime.type,
    episodes: anime.episodes,
    score: anime.score,
    synopsis: anime.synopsis,
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