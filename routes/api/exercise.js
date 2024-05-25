const express = require('express');
const router = express.Router();
const exercisesCtrl = require('../../controllers/exercise');
const authMiddleware = require('../../config/auth');

// All paths start with '/api/exercise'
router.post('/', authMiddleware, exercisesCtrl.create);
router.put('/:id', authMiddleware, exercisesCtrl.update);
router.delete('/:id', authMiddleware, exercisesCtrl.delete);
router.get('/', authMiddleware, exercisesCtrl.index);
router.get('/:id', authMiddleware, exercisesCtrl.show);

module.exports = router;
