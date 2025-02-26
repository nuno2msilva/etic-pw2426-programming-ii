/**
 * Represents an anime with its details.
 * @class
 */
export class Anime {
  /**
   * Creates an instance of Anime.
   * @param {Object} animeData - The anime data.
   * @param {string} animeData.title - The title of the anime.
   * @param {string[]} animeData.genres - The genres of the anime.
   * @param {number|null} animeData.episodes - The number of episodes.
   * @param {string} animeData.status - The status of the anime (e.g., "Currently Airing").
   * @param {string} animeData.duration - The duration of each episode.
   * @param {string|null} animeData.broadcastDay - The day the anime is broadcast.
   * @param {string|null} animeData.season - The season the anime aired.
   * @param {string[]} animeData.studios - The studios that produced the anime.
   */
  constructor({ title, genres, episodes, status, duration, broadcastDay, season, studios }) {
    this.title = title;
    this.genres = genres || 'Unknown';
    this.episodes = episodes || 'Unknown (Ongoing)';
    this.status = status || 'Unknown';
    this.duration = duration || 'Unknown';
    this.broadcastDay = broadcastDay || 'Unknown';
    this.season = season || 'Unknown';
    this.studios = studios || 'Unknown';
  }
}