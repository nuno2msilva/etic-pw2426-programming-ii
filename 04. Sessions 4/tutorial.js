try {
const fs = require('fs'); /*Creates a variable that fetches the fs (file system) API*/
const csvData = fs.readFileSync('sheet.csv', 'utf-8') /*Creates a variable that fetches a file in the specified path and how to read it*/
const rows = csvData.split('\n'); /*Creates a new row each time theres a paragraph (\n)*/
const headers = rows[0].split(',');/*Line 0 is a header categorizing the data, so each time theres a comma, it creates a new column*/
const data = rows.slice(1).map(row => { /*Creates a variable that slices the first element of the index, and maps all the available data*/
  const values = row.split(','); /*creates variable value and splits*/
  return {
    name: values[0],
    email: values[1],
    age: parseInt(values[2])
  };
});
fs.writeFileSync('session4_data.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }