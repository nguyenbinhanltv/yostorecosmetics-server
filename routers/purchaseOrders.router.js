const express = require('express');
const controller = require('../controllers/purchaseOrders.controller');

const router = express.Router();

router.get('/:purchaseOrdersId', controller.getOnePurchaseOrders);
router.get('/', controller.getPurchaseOrders);
router.post('/', controller.createOnePurchaseOrders);
router.patch('/:purchaseOrdersId', controller.updateOnePurchaseOrders);
router.delete('/:purchaseOrdersId', controller.deleteOnePurchaseOrders);

module.exports = router;