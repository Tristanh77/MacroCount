const express = require('express');
const router = express.Router();
const profileCtrl = require('../../controllers/profile');
const authMiddleware = require('../../config/auth');

// All paths start with '/api/profile'
router.post('/', authMiddleware, profileCtrl.create);
router.put('/:id', authMiddleware, profileCtrl.update);
router.delete('/:id', authMiddleware, profileCtrl.delete);
router.get('/', authMiddleware, profileCtrl.index);
router.get('/:id', authMiddleware, profileCtrl.show);

module.exports = router;
