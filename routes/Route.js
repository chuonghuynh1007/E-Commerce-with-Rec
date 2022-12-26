var express = require('express');
var router = express.Router();
var ctrl = require('../controller/userCtrl');

router.post('/signin', ctrl.register);
router.post('/login', ctrl.login);

module.exports = router;
