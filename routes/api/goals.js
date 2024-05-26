const express = require('express');
const router = express.Router();
const goalsCtrl = require('../../controllers/goals');
const authMiddleware = require('../../config/auth');

// All paths start with '/api/goals'
router.post('/', authMiddleware, goalsCtrl.create);
router.put('/:id', authMiddleware, goalsCtrl.update);
router.delete('/:id', authMiddleware, goalsCtrl.delete);
router.get('/', authMiddleware, goalsCtrl.index);
router.get('/', authMiddleware, goalsCtrl.show);

module.exports = router;
