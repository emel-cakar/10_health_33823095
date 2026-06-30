const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.showRegister = (req, res) => {
    res.render('register', { error: null });
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !username.trim()) {
        return res.render('register', { error: 'Username is required.' });
    }
    if (!email || !email.trim()) {
        return res.render('register', { error: 'Email is required.' });
    }

    const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!password || !passwordRule.test(password)) {
        return res.render('register', {
            error: 'Password must be at least 8 characters and include an uppercase letter, lowercase letter, number and special character.'
        });
    }

    try {
        const [existing] = await db.query(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existing.length > 0) {
            return res.render('register', { error: 'Username or email already taken.' });
        }

        const hash = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, hash]
        );

        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.render('register', { error: 'Something went wrong. Please try again.' });
    }
};

exports.showLogin = (req, res) => {
    res.render('login', { error: null });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.render('login', { error: 'Invalid username or password.' });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return res.render('login', { error: 'Invalid username or password.' });
        }

        req.session.userId   = user.id;
        req.session.username = user.username;

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('login', { error: 'Something went wrong. Please try again.' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
