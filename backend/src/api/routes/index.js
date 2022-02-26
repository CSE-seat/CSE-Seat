const {Router} = require('express')
const user = require('./user')
const main = require('./main')
const path = require('path');
const router = Router();

router.use('/user', user);
router.use(main);

module.exports = router;