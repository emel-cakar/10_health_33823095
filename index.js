require('dotenv').config();

const express        = require('express');
const session        = require('express-session');
const methodOverride = require('method-override');
const path           = require('path');

const indexRoutes   = require('./routes/index');
const authRoutes    = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// read form data from POST requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// lets forms send DELETE requests
app.use(methodOverride('_method'));

// session keeps the user logged in across pages
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// makes username available in every EJS view
app.use((req, res, next) => {
    res.locals.username = req.session.username || null;
    next();
});

app.use('/',         indexRoutes);
app.use('/',         authRoutes);
app.use('/workouts', workoutRoutes);

app.use((req, res) => {
    res.status(404).render('404');
});

// must run on port 8000 as per assignment requirements
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`FitTrack running at http://localhost:${PORT}`);
});
