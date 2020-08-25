const express = require('express');
const controller = require('../controllers/options.controller');

const router = express.Router();

router.get('/:optionId', controller.getOption);
router.get('/', controller.getOptions);
router.post('/', controller.createOption);
router.patch('/:optionId', controller.updateOption);
router.delete('/:optionId', controller.deleteOption);

module.exports = router;