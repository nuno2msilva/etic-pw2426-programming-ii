const fs = require('fs');

class ValidationError extends Error {  
  constructor(message) {  
    super(message);  
    this.name = 'ValidationError';  
  }  
}

function countWords(filename) { 
  const data = fs.readFileSync(filename, {encoding:"UTF-8"}).replace(/[^\w\s]/g, '');
  const words = data.split(' ');
  console.log(words);  
  return words.length;  
}  

try{
console.log(countWords('poemx.txt'));  
}

catch {throw new ValidationError('File does not exist!');}