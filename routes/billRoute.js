var express = require('express');
var router = express.Router();
var ctrl = require('../controller/billCtrl');

router.route('/cart').get(ctrl.cart);
router.post('/addCart', ctrl.addCart);
router.put('/alterCart', ctrl.alterCart);
router.delete('/delCart', ctrl.delCart);

module.exports = router;
