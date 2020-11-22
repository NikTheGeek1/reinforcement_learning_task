// const io = require('../socket');
const path = require('path');

exports.getIndex = (req, res, next) => {
    console.log('Here', 'index.js', 'line: ', '4');
    res.status(200).sendFile(path.join(__dirname, '../client/build/index.html'))
}


