const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const { requireLogin } = require('../middleware/auth');

// all routes here require login
router.use(requireLogin);

router.get('/',            workoutController.index);
router.get('/add',         workoutController.showAdd);
router.post('/add',        workoutController.add);
router.get('/:id/edit',    workoutController.showEdit);
router.post('/:id/edit',   workoutController.update);
router.post('/:id/delete', workoutController.delete);

module.exports = router;
