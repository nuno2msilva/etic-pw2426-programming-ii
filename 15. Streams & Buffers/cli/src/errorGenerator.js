import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'logfile.log');
const stream = fs.createWriteStream(filePath);

const statusCodes = [200, 404, 500];
const paths = ['/api/users', '/api/products', '/login', '/contact'];
const methods = ['GET'];
const date = '2023-10-01';

let bytesWritten = 0;
const targetBytes = 1073741824; // 1GB

const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
const generateLine = () => `${date} ${randomItem(methods)} ${randomItem(paths)} ${randomItem(statusCodes)}\n`;

async function writeChunk() {
    const linesPerChunk = 10000;
    let chunk = '';
    
    // Generate full chunk
    for (let i = 0; i < linesPerChunk; i++) {
        chunk += generateLine();
    }

    const chunkSize = Buffer.byteLength(chunk);
    const remainingBytes = targetBytes - bytesWritten;

    // Handle final chunk
    if (remainingBytes <= 0) {
        stream.end();
        console.log('Log file created successfully');
        return;
    }

    if (chunkSize > remainingBytes) {
        chunk = chunk.slice(0, remainingBytes);
        stream.write(chunk, () => {
            stream.end();
            console.log('Log file created successfully');
        });
        return;
    }

    // Write chunk and track bytes
    if (!stream.write(chunk)) {
        await new Promise(resolve => stream.once('drain', resolve));
    }
    
    bytesWritten += chunkSize;
    process.nextTick(writeChunk);
}

writeChunk().catch(console.error);