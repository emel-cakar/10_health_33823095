const db = require('../config/db');

exports.index = async (req, res) => {
    const userId = req.session.userId;

    try {
        // total workouts logged
        const [[countRow]] = await db.query(
            'SELECT COUNT(*) AS total FROM workouts WHERE user_id = ?',
            [userId]
        );

        // total minutes, defaults to 0 if nothing logged yet
        const [[minsRow]] = await db.query(
            'SELECT COALESCE(SUM(duration_mins), 0) AS totalMins FROM workouts WHERE user_id = ?',
            [userId]
        );

        // last 5 workouts
        const [recent] = await db.query(
            'SELECT * FROM workouts WHERE user_id = ? ORDER BY workout_date DESC LIMIT 5',
            [userId]
        );

        res.render('dashboard', {
            totalWorkouts : countRow.total,
            totalMins     : minsRow.totalMins,
            recent
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading dashboard.');
    }
};
