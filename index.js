'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const projects = require('./controllers/projects');

// Set up express and handlebars
const app = express();
const handlebars = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifEquals: function (arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
  },
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Create endpoints
app.get('/', projects.list);
app.get('/projects/:project_id', projects.single);

// Run the application
app.listen(3000, () => {
  console.log('Example app listening on port 3000');
});
