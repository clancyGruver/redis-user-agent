const fs = require('fs');
const readline = require('readline');
const redis = require('redis');

const rc = redis.createClient();

fs.readdir('./', (err, files) => {
    files.forEach(file => {
        if(!file.endsWith('.txt'))
            return false;
        console.log(file);
        const rl = readline.createInterface({
            input: require('fs').createReadStream('./' + file)
        });
        
        rl.on('line', function (line) {
            rc.lpush('proxy',line);
            console.log('Line from file:', line);
        });
    });
  })
/*

 */
console.log('after calling readFile');