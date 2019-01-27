const fs = require('fs');
const csv = require('csvtojson');
const through = require('through2');
const parseArgs = require('minimist');
const path = require('path');
const request = require('request');
const https = require('https');

const CSS_URL = 'https://github.githubassets.com/assets/github-99237e70e56dcc3c5964d00c50c7382b.css';
const ALIAS_CONFIG = {
    a: 'action',
    h: 'help',
    f: 'file',
    p: 'path',
}
const argv = parseArgs(process.argv.slice(2), {
  alias: ALIAS_CONFIG,
  unknown: (arg) => {
    console.error('Command is not supported: ', arg);
    return false;
  }
});

function end(done) {
  this.push(null);
  done();
}

function createInputStream(func) {
  return process.stdin
    .pipe(through(func, end))
    .pipe(process.stdout);
}

function reverse(data, encoding, next) {
  const reversedString = data
    .toString()
    .replace(/\r?\n|\r/g, '')
    .split('')
    .reverse()
    .join('')
    .concat('\n\n');
  next(null, reversedString);
}

function transform(data, encoding, next) {
  const transformedString = data
    .toString()
    .toUpperCase();
  next(null, transformedString);
}

function outputFile() {
  const inputFile = argv.file;

  if (!fs.existsSync(inputFile)) {
    throw new Error('File not exist!');
  }

  return fs.createReadStream(inputFile)
    .pipe(process.stdout);
}

function convertFromFile() {
  const inputFile = argv.file;

  if (!fs.existsSync(inputFile)) {
    throw new Error('File not exist!');
  }

  return csv()
    .fromFile(inputFile)
    .on('done', (error) => {
      if (error) console.log('Error convert to file');
    })
}

function convertToFile() {
  const inputFile = argv.file;

  if (!fs.existsSync(inputFile)) {
    throw new Error('No such File');
  }

  const writeStream = fs.createWriteStream(inputFile.replace('.csv', '.json'));
  writeStream.write('[');

  return convertFromFile()
    .on('json', json => writeStream.write(`${JSON.stringify(json)},\n`))
    .on('done', (error) => {
      if (error) console.log('Cannot convert the file');
      else writeStream.write(']');
    })
}

function cssBundler() {
  const cssPath = argv.path;

  if (!fs.existsSync(cssPath)) {
    throw new Error('Path not exist!');
  }

  const outputPath = path.join(cssPath, 'bundle.css');
  const destinationStream = fs.createWriteStream(outputPath);

  fs.readdir(cssPath, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      fs.readFile(path.join(cssPath, file), function(err, data) {
        if (err) {
          throw err;
        }
        destinationStream.write(data);
      });
    });
  });

  request(CSS_URL).pipe(destinationStream);
}

function help() {
  console.log(`
    '--help -h'       Help message
    '--action -a'     Availible actions: reverse, transform, outputFile, convertFromFile, convertToFile, css-bundle
    '--file -f'       File path
    '--path -p'       Directory path
    `);
}

const actionsMap = {
  reverse: () => createInputStream(reverse),
  transform: () => createInputStream(transform),
  outputFile,
  convertFromFile: () => convertFromFile().pipe(process.stdout),
  convertToFile,
  cssBundler,
};

if (argv.help) {
    help();
  } else {
    const action = actionsMap[argv.action] || function() { console.log('Action not defined.') };
    action();
  }