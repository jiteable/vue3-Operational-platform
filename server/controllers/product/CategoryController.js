const CategoryService = require('../../services/product/CategoryService');

class CategoryController {
  // 获取所有一级分类
  async getCategory1(req, res) {
    try {
      const result = await CategoryService.getAllCategory1();
      res.json(result);
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '获取一级分类失败',
        ok: false,
        data: []
      });
    }
  }

  // 根据一级分类ID获取二级分类
  async getCategory2(req, res) {
    try {
      const { category1Id } = req.params;
      const result = await CategoryService.getCategory2ByCategory1Id(category1Id);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '获取二级分类失败',
        ok: false,
        data: []
      });
    }
  }

  // 根据二级分类ID获取三级分类
  async getCategory3(req, res) {
    try {
      const { category2Id } = req.params;
      const result = await CategoryService.getCategory3ByCategory2Id(category2Id);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '获取三级分类失败',
        ok: false,
        data: []
      });
    }
  }

  // 添加一级分类
  async addCategory1(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({
          code: 400,
          message: '分类名称不能为空',
          ok: false,
          data: null
        });
      }
      const result = await CategoryService.addCategory1(name);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '添加一级分类失败',
        ok: false,
        data: null
      });
    }
  }

  // 添加二级分类
  async addCategory2(req, res) {
    try {
      const { name, category1Id } = req.body;
      if (!name || !category1Id) {
        return res.status(400).json({
          code: 400,
          message: '分类名称和一级分类ID不能为空',
          ok: false,
          data: null
        });
      }
      const result = await CategoryService.addCategory2(name, category1Id);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '添加二级分类失败',
        ok: false,
        data: null
      });
    }
  }

  // 添加三级分类
  async addCategory3(req, res) {
    try {
      const { name, category2Id } = req.body;
      if (!name || !category2Id) {
        return res.status(400).json({
          code: 400,
          message: '分类名称和二级分类ID不能为空',
          ok: false,
          data: null
        });
      }
      const result = await CategoryService.addCategory3(name, category2Id);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '添加三级分类失败',
        ok: false,
        data: null
      });
    }
  }
}

module.exports = new CategoryController(); 