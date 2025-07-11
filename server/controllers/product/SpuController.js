const SpuService = require('../../services/product/SpuService');
const SkuService = require('../../services/product/SkuService');

// 获取 SPU 列表
exports.getSpuList = async (req, res) => {
  try {
    const { page = 1, limit = 10, category3Id } = req.query;
    const result = await SpuService.getSpuList(parseInt(page), parseInt(limit), category3Id);

    res.json({
      code: 200,
      message: '获取成功',
      ok: true,
      data: result
    });
  } catch (error) {
    console.error('获取SPU列表失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取SPU列表失败',
      ok: false
    });
  }
};

// 获取所有品牌
exports.getAllTrademarks = async (req, res) => {
  try {
    const trademarks = await SpuService.getAllTrademarks();

    res.json({
      code: 200,
      message: '获取成功',
      ok: true,
      data: trademarks
    });
  } catch (error) {
    console.error('获取品牌列表失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取品牌列表失败',
      ok: false
    });
  }
};

// 获取 SPU 图片列表
exports.getSpuImages = async (req, res) => {
  try {
    const { spuId } = req.params;
    const images = await SpuService.getSpuImages(spuId);

    res.json({
      code: 200,
      message: '获取成功',
      ok: true,
      data: images
    });
  } catch (error) {
    console.error('获取SPU图片失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取SPU图片失败',
      ok: false
    });
  }
};

// 获取 SPU 销售属性
exports.getSpuSaleAttrs = async (req, res) => {
  try {
    const { spuId } = req.params;
    const saleAttrs = await SpuService.getSpuSaleAttrs(spuId);

    res.json({
      code: 200,
      message: '获取成功',
      ok: true,
      data: saleAttrs
    });
  } catch (error) {
    console.error('获取SPU销售属性失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取SPU销售属性失败',
      ok: false
    });
  }
};

// 获取所有销售属性
exports.getAllSaleAttrs = async (req, res) => {
  try {
    const saleAttrs = await SpuService.getAllSaleAttrs();

    res.json({
      code: 200,
      message: '获取成功',
      ok: true,
      data: saleAttrs
    });
  } catch (error) {
    console.error('获取销售属性失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取销售属性失败',
      ok: false
    });
  }
};

// 添加或更新 SPU
exports.addOrUpdateSpu = async (req, res) => {
  try {
    const spuData = req.body;
    const result = await SpuService.addOrUpdateSpu(spuData);

    res.json({
      code: 200,
      message: spuData.id ? '更新成功' : '添加成功',
      ok: true,
      data: result
    });
  } catch (error) {
    console.error('添加或更新SPU失败:', error);
    res.status(500).json({
      code: 500,
      message: '添加或更新SPU失败',
      ok: false
    });
  }
};

// 删除 SPU
exports.deleteSpu = async (req, res) => {
  try {
    const { spuId } = req.params;
    await SpuService.deleteSpu(spuId);

    res.json({
      code: 200,
      message: '删除成功',
      ok: true
    });
  } catch (error) {
    console.error('删除SPU失败:', error);
    res.status(500).json({
      code: 500,
      message: '删除SPU失败',
      ok: false
    });
  }
};

// 获取 SKU 列表
exports.getSkuList = async (req, res) => {
  try {
    const { spuId } = req.params;
    const skus = await SkuService.getSkuList(spuId);

    res.json({
      code: 200,
      message: '获取成功',
      ok: true,
      data: skus
    });
  } catch (error) {
    console.error('获取SKU列表失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取SKU列表失败',
      ok: false
    });
  }
};

// 添加 SKU
exports.addSku = async (req, res) => {
  try {
    const skuData = req.body;
    const result = await SkuService.addSku(skuData);

    res.json({
      code: 200,
      message: '添加成功',
      ok: true,
      data: result
    });
  } catch (error) {
    console.error('添加SKU失败:', error);
    res.status(500).json({
      code: 500,
      message: '添加SKU失败',
      ok: false
    });
  }
}; 