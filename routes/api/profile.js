const express = require('express');
const router = express.Router();
const profileCtrl = require('../../controllers/profile');

// All paths start with '/api/profile'

router.post('/', profileCtrl.create);
router.put('/:id', profileCtrl.update);
router.delete('/:id', profileCtrl.delete);
router.get('/', profileCtrl.index);
router.get('/:id', profileCtrl.show);

module.exports = router;
