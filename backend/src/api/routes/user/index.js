const {Router} = require('express')
const join = require('./join')
const login = require('./login')
const path = require('path');
const router = Router();

router.use('/join', join);
router.use('/login', login);


module.exports = router;