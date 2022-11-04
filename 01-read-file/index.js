const fs = require('fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(filePath);

let fullData = '';

readableStream.on('data', chunk => fullData += chunk);
readableStream.on('end', () => console.log(fullData.toString()));
readableStream.on('error', error => console.log('Error', error.message));