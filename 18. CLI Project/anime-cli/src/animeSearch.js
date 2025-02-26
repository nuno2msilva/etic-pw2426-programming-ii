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

// Search anime using the Jikan API
export const searchAnime = async (query) => {
  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
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