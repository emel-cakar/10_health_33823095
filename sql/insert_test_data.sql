# run this after create_db.sql
# all test account passwords are listed next to each user below

USE health;

# gold = marker's account (password: smiths123ABC$)
# john_doe and jane_fit = demo accounts (password: password123)
INSERT INTO users (username, email, password_hash) VALUES
(
    'gold',
    'gold@fittrack.com',
    '$2b$10$V8eXkBft9hspmQP.423qmO0RCWDk3SEZtFqOKY5A992nRVsasXc8C'
),
(
    'john_doe',
    'john@example.com',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
),
(
    'jane_fit',
    'jane@example.com',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
);

# workouts for john_doe (user_id = 2)
INSERT INTO workouts (user_id, exercise_name, category, sets, reps, duration_mins, notes, workout_date) VALUES
(2, 'Bench Press',     'Strength',    4, 10, NULL, 'Felt strong today',       '2026-05-10'),
(2, 'Running',         'Cardio',   NULL, NULL,  30, '5km steady pace',         '2026-05-11'),
(2, 'Squats',          'Strength',    3, 12, NULL, 'Increased weight by 5kg', '2026-05-12'),
(2, 'Yoga Flow',       'Flexibility', NULL, NULL, 45, 'Morning session',       '2026-05-13'),
(2, 'Pull Ups',        'Strength',    4,  8, NULL, 'New personal best',       '2026-05-14'),
(2, 'Cycling',         'Cardio',   NULL, NULL,  60, 'Outdoor ride',           '2026-05-15');

# workouts for jane_fit (user_id = 3)
INSERT INTO workouts (user_id, exercise_name, category, sets, reps, duration_mins, notes, workout_date) VALUES
(3, 'Deadlift',        'Strength',    3,  8, NULL, 'Good form today',        '2026-05-10'),
(3, 'Treadmill',       'Cardio',   NULL, NULL,  25, 'Interval training',      '2026-05-12'),
(3, 'Plank',           'Strength',    3, NULL,   5, '60 seconds each set',    '2026-05-14'),
(3, 'Swimming',        'Cardio',   NULL, NULL,  40, '20 lengths',             '2026-05-15');
