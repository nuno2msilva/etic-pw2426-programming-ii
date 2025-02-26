import { createReadStream } from 'node:fs';

export function start(file) {
  const stream = createReadStream('LunarData.csv', 'utf-8');  
  stream.on('data', chunk => console.log('Chunk:', chunk.length));
}