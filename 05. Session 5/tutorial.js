const fs = require('node:fs');
const csvData = fs.readFileSync('data.csv', 'utf-8');
const rows = csvData.split('\n');
const _headers = rows[0].split(','); // ["name", "email", "age"]
const data = rows.slice(1).map(row => {
  const values = row.split(',');
  return {
    id: values[0],
    name: values[1],
    city: values[2]
  };
});
fs.writeFileSync('data.json', JSON.stringify(data, null, 2));  

let users = new Map();

