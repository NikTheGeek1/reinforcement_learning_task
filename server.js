const path = require('path');
const express = require('express');

const app = express();
const indexRoutes = require('./routes/index');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/', indexRoutes);
app.use(express.static(path.join(__dirname, './client/build')))
app.use((error, req, res, next) => {
    console.log('error', 'server.js', 'line: ', '17');
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

const server = app.listen(8080, () => {
    console.log('Server\'s up!', 'server.js', 'line: ', '25'); 
});


// const io = require('./socket').init(server);
// io.on('connection', socket => {
//     console.log('Client connected', 'server.js', 'line: ', '27');
//     socket.on('hi_server', data => {
//         console.log('I am here', 'server.js', 'line: ', '32');
//     })
// })