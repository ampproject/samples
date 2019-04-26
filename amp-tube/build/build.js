const fs = require('fs');
const manifest = fs.readFileSync('./src/manifest.webmanifest', {
  encoding: 'utf8'
});
console.log(JSON.stringify(JSON.parse(manifest)));