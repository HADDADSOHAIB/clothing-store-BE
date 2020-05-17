const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();
// const userController=require('../controllers/userController');

router.route('/').post(categoryController.createCategory);
router.route('/:id').get(categoryController.getCategory);
module.exports = router;
