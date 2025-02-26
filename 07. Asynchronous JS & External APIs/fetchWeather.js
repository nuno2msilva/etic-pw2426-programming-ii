import fetch from "node-fetch";
import { writeFile } from "node:fs/promises";
import { API_KEY } from "./config.js"; // Import the API key

const fetchTemp = async (city, API_KEY) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);

    if (!response.ok) {
      if (response.status === 401) throw new Error("Invalid API key");
      if (response.status === 404) throw new Error(`SPecified city "${city}" not found`);
      throw new Error(`Failed to fetch data for ${city}: ${response.statusText}`);
    }

    const { main: { temp, humidity } } = await response.json();
    return { city, temp, humidity };
  } 
  
  catch (error) {
    console.error(`Error fetching data for ${city}:`, error.message);
    return null;
  }
};

const fetchTemps = async () => {
  const CITIES = ["Zapopan", "Lisboa", "Tokyo"]; // Add as many cities as wanted

  const results = (await Promise.all(CITIES.map((city) => fetchTemp(city, API_KEY)))).filter(Boolean);

  const jsonOutput = `[\n${results.map((result) => JSON.stringify(result)).join(",\n")}\n]`;

  await writeFile("output.json", jsonOutput);

  console.log("Weather data saved to output.json");
};

fetchTemps();
