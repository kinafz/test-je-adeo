const { exit } = require('yargs');
const yargs = require('yargs');

const utils = require('./utils');
const { data } = require('./data.js');

const options = yargs
  .usage('Usage: node app.js -f <filter>')
  .option('f', {
    alias: 'filter',
    describe: 'The data filter',
    type: 'string',
  })
  .usage('Usage: node app.js -c')
  .option('c', {
    alias: 'count',
  })
  .argv;

if (!options.filter === !options.count) { // s'il n'y a pas d'options ou les deux => bad usage, on affiche l'aide
  yargs.showHelp();
  exit(1);
}

const result = options.filter ? utils.doFilter(data, options.filter) : utils.doCount(data);

console.log(JSON.stringify(result));
