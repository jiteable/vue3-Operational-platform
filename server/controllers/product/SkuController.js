const SkuService = require('../../services/product/SkuService');

const SkuController = {
  list: async (req, res) => {
    try {
      const { page, limit } = req.params;
      const data = await SkuService.getList({ page: Number(page), limit: Number(limit) });
      res.send({
        code: 200,
        message: '获取成功',
        ok: true,
        data: {
          ...data,
          orders: [],
          optimizeCountSql: false,
          hitCount: false,
          countId: null,
          maxLimit: null,
          searchCount: true
        }
      });
    } catch (err) {
      res.status(500).send({ code: 500, message: err.message, ok: false });
    }
  },
  onSale: async (req, res) => {
    try {
      await SkuService.onSale(req.params.skuId);
      res.send({ code: 200, message: '上架成功', ok: true });
    } catch (err) {
      res.status(500).send({ code: 500, message: err.message, ok: false });
    }
  },
  cancelSale: async (req, res) => {
    try {
      await SkuService.cancelSale(req.params.skuId);
      res.send({ code: 200, message: '下架成功', ok: true });
    } catch (err) {
      res.status(500).send({ code: 500, message: err.message, ok: false });
    }
  },
  getInfo: async (req, res) => {
    try {
      const sku = await SkuService.getInfo(req.params.skuId);
      if (!sku) {
        return res.status(404).send({ code: 404, message: '未找到SKU', ok: false });
      }
      res.send({ code: 200, message: '获取成功', ok: true, data: sku });
    } catch (err) {
      res.status(500).send({ code: 500, message: err.message, ok: false });
    }
  },
  delete: async (req, res) => {
    try {
      await SkuService.delete(req.params.skuId);
      res.send({ code: 200, message: '删除成功', ok: true });
    } catch (err) {
      res.status(500).send({ code: 500, message: err.message, ok: false });
    }
  }
};

module.exports = SkuController; 