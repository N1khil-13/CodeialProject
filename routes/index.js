const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
// const userController = require('../controllers/users_controller');



// console.log('router loaded');

router.use('/api', require('./api'));

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

module.exports = router;