const fs = require('fs');
const version = require('./package.json').version;
fs.writeFileSync('./public/version.json', JSON.stringify({ version }));