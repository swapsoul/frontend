// server.js
const express = require('express');
const path = require('path');
const app = express();
// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname + '/dist/swapsoul-frontend'));
// Start the app by listening on the default
// Heroku port

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/swapsoul-frontend/index.html'));
});

console.log(process.env.PORT);
app.listen(process.env.PORT || 8090, '0.0.0.0');
