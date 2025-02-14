async function fetchTemp(city, API_KEY) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return { 
      Cidade: city,
      Temperatura: data.main.temp, 
      Humidade: data.main.humidity 
    };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

async function fetchTemps() {
  const API_KEY = "c3f616dcf72fe323576f58e3a28108fa";
  const CITIES = ["Zapopan", "Lisboa", "Tokyo"];
  const promises = CITIES.map(function(city) {
    return fetchTemp(city, API_KEY);
  });
  const results = await Promise.all(promises);
  console.log(results);
}
fetchTemps();