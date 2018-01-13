// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT || '3100';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

server.listen( port , () => console.log('Running'));
