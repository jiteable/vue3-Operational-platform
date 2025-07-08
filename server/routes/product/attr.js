var express = require('express');
var AttrRouter = express.Router();
const AttrController = require('../../controllers/product/AttrController');

AttrRouter.get('/product/attr/:c1Id/:c2Id/:c3Id', AttrController.getAttrs);
AttrRouter.post('/product/attr/', AttrController.addOrUpdateAttr);
AttrRouter.delete('/product/attr/:attrId', AttrController.deleteAttr);

module.exports = AttrRouter;