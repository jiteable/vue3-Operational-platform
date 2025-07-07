const TrademarkService = require("../../services/product/TrademarkService")

const TrademarkController = {
  // 获取品牌列表
  getTrademark: async (req, res) => {
    console.log('getTrademark 被调用', req.url);
    try {
      const { page, limit } = req.params;

      const result = await TrademarkService.getList(page, limit);

      res.json({
        code: 200,
        message: "获取品牌列表成功",
        data: result,
        ok: true
      });
    } catch (error) {
      console.error('获取品牌列表错误:', error);
      res.status(500).json({
        code: 500,
        message: '获取品牌列表失败',
        ok: false
      });
    }
  },

  // 添加品牌
  addTrademark: async (req, res) => {
    try {
      // 获取请求数据
      const { tmName, logoUrl } = req.body;

      // 验证必填字段
      if (!tmName || !logoUrl) {
        return res.status(400).json({
          code: 400,
          message: '品牌名称和LOGO不能为空',
          ok: false
        });
      }

      // 检查品牌名称是否已存在
      const existingTrademark = await TrademarkService.checkNameExists(tmName);
      if (existingTrademark) {
        return res.status(400).json({
          code: 400,
          message: '品牌名称已存在',
          ok: false
        });
      }

      // 调用服务层添加品牌
      const newTrademark = await TrademarkService.add({ tmName, logoUrl });

      if (!newTrademark) {
        return res.status(500).json({
          code: 500,
          message: '添加品牌失败',
          ok: false
        });
      }

      res.json({
        code: 200,
        message: '添加品牌成功',
        data: null,
        ok: true
      });
    } catch (error) {
      console.error('添加品牌错误:', error);
      res.status(500).json({
        code: 500,
        message: '添加品牌失败',
        ok: false
      });
    }
  },

  // 修改品牌
  updateTrademark: async (req, res) => {
    try {
      // 获取请求数据
      const { id, tmName, logoUrl } = req.body;

      // 验证必填字段
      if (!id || !tmName || !logoUrl) {
        return res.status(400).json({
          code: 400,
          message: '品牌ID、名称和LOGO不能为空',
          ok: false
        });
      }

      // 检查品牌是否存在
      const existingTrademark = await TrademarkService.getById(id);
      if (!existingTrademark) {
        return res.status(404).json({
          code: 404,
          message: '品牌不存在',
          ok: false
        });
      }

      // 检查品牌名称是否已被其他品牌使用
      const nameExists = await TrademarkService.checkNameExists(tmName, id);
      if (nameExists) {
        return res.status(400).json({
          code: 400,
          message: '品牌名称已存在',
          ok: false
        });
      }

      // 调用服务层更新品牌
      const updatedTrademark = await TrademarkService.update({ id, tmName, logoUrl });

      if (!updatedTrademark) {
        return res.status(500).json({
          code: 500,
          message: '修改品牌失败',
          ok: false
        });
      }

      res.json({
        code: 200,
        message: '修改品牌成功',
        data: null,
        ok: true
      });
    } catch (error) {
      console.error('修改品牌错误:', error);
      res.status(500).json({
        code: 500,
        message: error.message || '修改品牌失败',
        ok: false
      });
    }
  },

  // 删除品牌
  delTrademark: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          code: 400,
          message: '品牌ID不能为空',
          ok: false
        });
      }

      // 检查品牌是否存在
      const existingTrademark = await TrademarkService.getById(id);
      if (!existingTrademark) {
        return res.status(404).json({
          code: 404,
          message: '品牌不存在',
          ok: false
        });
      }

      // 调用服务层删除品牌
      const deletedTrademark = await TrademarkService.delete(id);

      if (!deletedTrademark) {
        return res.status(500).json({
          code: 500,
          message: '删除品牌失败',
          ok: false
        });
      }

      res.json({
        code: 200,
        message: '删除品牌成功',
        data: null,
        ok: true
      });
    } catch (error) {
      console.error('删除品牌错误:', error);
      res.status(500).json({
        code: 500,
        message: error.message || '删除品牌失败',
        ok: false
      });
    }
  },

  // 文件上传
  fileUpload: async (req, res) => {
    try {
      // 检查是否有文件上传
      if (!req.file) {
        return res.status(400).json({
          code: 400,
          message: '没有文件上传',
          ok: false
        });
      }

      // 获取上传的文件信息
      const file = req.file;

      // 构建完整的文件访问URL
      // 由于前端通过代理访问，我们需要返回完整的URL
      const baseUrl = req.protocol + '://' + req.get('host');
      const fileUrl = `${baseUrl}/avataruploads/${file.filename}`;

      // 返回成功响应
      res.json({
        code: 200,
        message: '文件上传成功',
        data: fileUrl,
        ok: true
      });

    } catch (error) {
      console.error('文件上传错误:', error);
      res.status(500).json({
        code: 500,
        message: '文件上传失败',
        ok: false
      });
    }
  }
}

module.exports = TrademarkController;