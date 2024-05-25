const express = require('express');
const router = express.Router();
const mealsCtrl = require('../../controllers/meals');
const authMiddleware = require('../../config/auth');

// All paths start with '/api/meals'
router.post('/', authMiddleware, mealsCtrl.create);
router.put('/:id', authMiddleware, mealsCtrl.update);
router.delete('/:id', authMiddleware, mealsCtrl.delete);
router.get('/', authMiddleware, mealsCtrl.index);
router.get('/:id', authMiddleware, mealsCtrl.show);

module.exports = router;
