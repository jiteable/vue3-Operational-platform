const TrademarkModel = require("../../models/product/TrademarkModel")

const TrademarkService = {
  // 添加品牌
  add: async ({ tmName, logoUrl }) => {
    const trademark = await TrademarkModel.create({
      tmName,
      logoUrl
    });

    // 返回符合前端格式的数据
    return {
      id: trademark._id,
      tmName: trademark.tmName,
      logoUrl: trademark.logoUrl
    };
  },

  // 获取品牌列表（支持分页）
  getList: async (page = 1, limit = 3) => {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 3;
    const skip = (pageNum - 1) * limitNum;

    // 获取总数
    const total = await TrademarkModel.countDocuments({});

    // 获取分页数据
    const records = await TrademarkModel.find({})
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 }); // 按创建时间倒序

    // 转换数据格式以匹配前端期望
    const formattedRecords = records.map(item => ({
      id: item._id,
      tmName: item.tmName,
      logoUrl: item.logoUrl
    }));

    return {
      records: formattedRecords,
      total,
      size: limitNum,
      current: pageNum,
      searchCount: true,
      pages: Math.ceil(total / limitNum)
    };
  },

  // 根据ID获取品牌
  getById: async (id) => {
    const trademark = await TrademarkModel.findById(id);
    if (!trademark) return null;

    // 返回符合前端格式的数据
    return {
      id: trademark._id,
      tmName: trademark.tmName,
      logoUrl: trademark.logoUrl
    };
  },

  // 更新品牌
  update: async ({ id, tmName, logoUrl }) => {
    const trademark = await TrademarkModel.findByIdAndUpdate(
      id,
      {
        tmName,
        logoUrl
      },
      { new: true } // 返回更新后的文档
    );

    if (!trademark) return null;

    // 返回符合前端格式的数据
    return {
      id: trademark._id,
      tmName: trademark.tmName,
      logoUrl: trademark.logoUrl
    };
  },

  // 删除品牌
  delete: async (id) => {
    const trademark = await TrademarkModel.findByIdAndDelete(id);
    if (!trademark) return null;

    // 返回符合前端格式的数据
    return {
      id: trademark._id,
      tmName: trademark.tmName,
      logoUrl: trademark.logoUrl
    };
  },

  // 检查品牌名称是否存在
  checkNameExists: async (tmName, excludeId = null) => {
    const query = { tmName };
    if (excludeId) {
      query._id = { $ne: excludeId }; // 排除指定ID
    }
    return TrademarkModel.findOne(query);
  }
}

module.exports = TrademarkService;
