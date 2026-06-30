const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { requireLogin } = require('../middleware/auth');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/dashboard', requireLogin, dashboardController.index);

module.exports = router;
