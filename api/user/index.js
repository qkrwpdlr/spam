var express = require('express')
var router = express.Router();
var ctrl = require('./user.ctrl.js')

router.get('/',ctrl.index);
router.get('/:id',ctrl.show);
router.delete('/:id',ctrl.del);
router.post('/',ctrl.write);
router.put('/:id',ctrl.rewrite);

module.exports = router;
