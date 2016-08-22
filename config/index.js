const fs = require('fs');
const path = require('path');

const fileExist = fs.existsSync(path.resolve(__dirname, 'firebase.json'));

if(fileExist) {
    module.exports = require('./firebase.json');
}
else {
    module.exports = require('./firebase_template.json');
}
