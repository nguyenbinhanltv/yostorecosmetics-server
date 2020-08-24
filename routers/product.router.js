const express = require('express');
const controller = require('../controllers/product.controller');

const router = express.Router();

router.get('/:productId', controller.getProduct);
router.get('/', controller.getProducts);
router.post('/', controller.createProduct);
router.patch('/:productId', controller.updateProduct);
router.delete('/:productId', controller.deleteProduct);

module.exports = router;