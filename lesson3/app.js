const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Default setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')));

// Engine setup
app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

// Routes setup
app.use(apiRoutes);

app.listen(5200, () => {
    console.log('Serves has started on PORT 5200')
})