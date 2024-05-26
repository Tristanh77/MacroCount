const express = require('express');
const router = express.Router();
const profileCtrl = require('../../controllers/profile');
const authMiddleware = require('../../config/auth');

// All paths start with '/api/profile'
router.post('/', authMiddleware, profileCtrl.create);
router.put('/me', authMiddleware, profileCtrl.update); // Update current profile
router.delete('/:id', authMiddleware, profileCtrl.delete);
router.get('/me', authMiddleware, profileCtrl.show); // Get current profile

module.exports = router;
