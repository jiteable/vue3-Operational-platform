const { Category1, Category2, Category3 } = require('../../models/product/CategoryModel.js');

class CategoryService {
  // 获取所有一级分类
  async getAllCategory1() {
    try {
      const categories = await Category1.find().select('_id name');
      return {
        code: 200,
        message: '获取一级分类成功',
        ok: true,
        data: categories.map(cat => ({
          id: cat._id,
          name: cat.name
        }))
      };
    } catch (error) {
      return {
        code: 500,
        message: '获取一级分类失败',
        ok: false,
        data: []
      };
    }
  }

  // 根据一级分类ID获取二级分类
  async getCategory2ByCategory1Id(category1Id) {
    try {
      const categories = await Category2.find({ category1Id }).select('_id name category1Id');
      return {
        code: 200,
        message: '获取二级分类成功',
        ok: true,
        data: categories.map(cat => ({
          id: cat._id,
          name: cat.name,
          category1Id: cat.category1Id
        }))
      };
    } catch (error) {
      return {
        code: 500,
        message: '获取二级分类失败',
        ok: false,
        data: []
      };
    }
  }

  // 根据二级分类ID获取三级分类
  async getCategory3ByCategory2Id(category2Id) {
    try {
      const categories = await Category3.find({ category2Id }).select('_id name category2Id');
      return {
        code: 200,
        message: '获取三级分类成功',
        ok: true,
        data: categories.map(cat => ({
          id: cat._id,
          name: cat.name,
          category2Id: cat.category2Id
        }))
      };
    } catch (error) {
      return {
        code: 500,
        message: '获取三级分类失败',
        ok: false,
        data: []
      };
    }
  }

  // 添加一级分类
  async addCategory1(name) {
    try {
      const category = new Category1({ name });
      await category.save();
      return {
        code: 200,
        message: '添加一级分类成功',
        ok: true,
        data: {
          id: category._id,
          name: category.name
        }
      };
    } catch (error) {
      return {
        code: 500,
        message: '添加一级分类失败',
        ok: false,
        data: null
      };
    }
  }

  // 添加二级分类
  async addCategory2(name, category1Id) {
    try {
      const category = new Category2({ name, category1Id });
      await category.save();
      return {
        code: 200,
        message: '添加二级分类成功',
        ok: true,
        data: {
          id: category._id,
          name: category.name,
          category1Id: category.category1Id
        }
      };
    } catch (error) {
      return {
        code: 500,
        message: '添加二级分类失败',
        ok: false,
        data: null
      };
    }
  }

  // 添加三级分类
  async addCategory3(name, category2Id) {
    try {
      const category = new Category3({ name, category2Id });
      await category.save();
      return {
        code: 200,
        message: '添加三级分类成功',
        ok: true,
        data: {
          id: category._id,
          name: category.name,
          category2Id: category.category2Id
        }
      };
    } catch (error) {
      return {
        code: 500,
        message: '添加三级分类失败',
        ok: false,
        data: null
      };
    }
  }
}

module.exports = new CategoryService(); 