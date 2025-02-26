import fetch from 'node-fetch';  // Correct import statement

// Get search query from command line argument
const query = process.argv.slice(2).join(' ');

const searchAnime = async () => {
  try {
    // Check if the query is provided
    if (!query) {
      throw new Error('Usage: node cli.js <anime-name>');
    }

    // Fetch data from the Jikan API, showing only 9 animes at a time
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=9`);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // If no results, throw an error
    if (!data.data || data.data.length === 0) {
      console.log('No results found.');
    } else {
      // Success! Print the results
      data.data.forEach((anime, index) => {
        console.log(`${index + 1}. ${anime.title}`);
      });
    }
  } 
  catch (error) {
    // Check for network-related errors like ENOTFOUND
    if (error.code === 'ENOTFOUND') {
      console.error('Error: Unable to connect to the API. Please check your internet connection.');
    } else {
      console.error('Error:', error.message);
    }
  }
};

// Call the search function
searchAnime();
