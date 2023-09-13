const express = require('express');
const router = express.Router();

const thoughtsRoutes = require('../routes/thoughtsRoutes');
const userRoutes = require('../routes/userRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', userRoutes);

module.exports = router;
