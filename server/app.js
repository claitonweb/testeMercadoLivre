const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const override = require('method-override');
const load = require('express-load');

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.urlencoded({
		extended : true,
		limit: '100mb'
}));
app.use(bodyParser.json({
    limit: '100mb'
}));
app.use(override());

load('controllers', {
		cwd : 'server'
	}).then('routes').into(app);

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  //res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});


module.exports = app;