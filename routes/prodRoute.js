var express = require('express');
var router = express.Router();
var ctrl = require('../controller/prodCtrl');


router.get('/allProd', ctrl.getAll);
router.get('/getByCate', ctrl.getByCate);
router.get('/description', ctrl.detail);
router.post('/addProd', ctrl.addNew);
router.post('/addProdImg', ctrl.upload);

router.delete('/delProd/:id', ctrl.delProd);


module.exports = router;
