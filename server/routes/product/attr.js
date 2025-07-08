var express = require('express');
var AttrRouter = express.Router();
const AttrController = require('../../controllers/product/AttrController');

AttrRouter.get('/attrInfoList/:c1Id/:c2Id/:c3Id', AttrController.getAttrs);
AttrRouter.post('/saveAttrInfo', AttrController.addOrUpdateAttr);
AttrRouter.delete('/deleteAttr/:attrId', AttrController.deleteAttr);

module.exports = AttrRouter;