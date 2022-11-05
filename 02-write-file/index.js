const readline = require('readline');
const fs = require('fs');
const path = require('node:path');
const { stdin: input, stdout: output } = require('process');

outputStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), {flags: 'a'});

const rl = readline.createInterface({ input, output });

output.write('enter your text: ');

rl.on('line', (input) => {
  if (input === 'exit') 
  {
    doneInput(output);
    return;
  }
  outputStream.write(input);
});

rl.on('SIGINT', () => {
  doneInput(output);
});

const doneInput = (output) => {
  rl.close();
  output.write('Goodbye!');
  outputStream.end();
}