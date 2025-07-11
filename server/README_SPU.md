# SPU 模块后端实现

## 概述

本模块实现了完整的 SPU（标准产品单元）和 SKU（库存单元）管理功能，包括：

- SPU 的增删改查
- SKU 的添加和查询
- 品牌管理
- 销售属性管理
- 图片管理

## 数据模型

### 1. SPU 模型 (`server/models/product/spu.js`)
```javascript
{
  spuName: String,           // SPU 名称
  description: String,        // SPU 描述
  category3Id: ObjectId,     // 三级分类 ID
  tmId: ObjectId,           // 品牌 ID
  spuImageList: [SpuImg],   // SPU 图片列表
  spuSaleAttrList: [SaleAttr] // SPU 销售属性列表
}
```

### 2. SKU 模型 (`server/models/product/sku.js`)
```javascript
{
  skuName: String,           // SKU 名称
  price: Number,             // 价格
  weight: Number,            // 重量
  skuDesc: String,          // SKU 描述
  skuDefaultImg: String,    // 默认图片
  category3Id: ObjectId,    // 三级分类 ID
  spuId: ObjectId,         // SPU ID
  tmId: ObjectId,          // 品牌 ID
  skuAttrValueList: [Attr], // 平台属性值列表
  skuSaleAttrValueList: [SaleAttr], // 销售属性值列表
  isSale: Number           // 上架状态 (0: 下架, 1: 上架)
}
```

### 3. 品牌模型 (`server/models/product/trademark.js`)
```javascript
{
  tmName: String,    // 品牌名称
  logoUrl: String    // 品牌 Logo
}
```

## API 接口

### SPU 相关接口

1. **获取 SPU 列表**
   - 路径: `GET /admin/product/:page/:limit?category3Id=xxx`
   - 功能: 分页获取指定分类下的 SPU 列表

2. **获取所有品牌**
   - 路径: `GET /admin/product/baseTrademark/getTrademarkList`
   - 功能: 获取所有品牌列表

3. **获取 SPU 图片列表**
   - 路径: `GET /admin/product/spuImageList/:spuId`
   - 功能: 获取指定 SPU 的图片列表

4. **获取 SPU 销售属性**
   - 路径: `GET /admin/product/spuSaleAttrList/:spuId`
   - 功能: 获取指定 SPU 的销售属性

5. **获取所有销售属性**
   - 路径: `GET /admin/product/baseSaleAttrList`
   - 功能: 获取所有销售属性

6. **添加 SPU**
   - 路径: `POST /admin/product/saveSpuInfo`
   - 功能: 添加新的 SPU

7. **更新 SPU**
   - 路径: `POST /admin/product/updateSpuInfo`
   - 功能: 更新已有的 SPU

8. **删除 SPU**
   - 路径: `DELETE /admin/product/deleteSpu/:spuId`
   - 功能: 删除指定的 SPU

### SKU 相关接口

1. **添加 SKU**
   - 路径: `POST /admin/product/saveSkuInfo`
   - 功能: 添加新的 SKU

2. **获取 SKU 列表**
   - 路径: `GET /admin/product/findBySpuId/:spuId`
   - 功能: 获取指定 SPU 下的所有 SKU

## 使用说明

### 1. 启动服务器
```bash
cd server
npm start
```

### 2. 初始化测试数据
```bash
node scripts/initData.js
```

### 3. 测试接口
可以使用 Postman 或其他 API 测试工具测试各个接口。

## 文件结构

```
server/
├── models/product/
│   ├── spu.js          # SPU 数据模型
│   ├── sku.js          # SKU 数据模型
│   ├── trademark.js    # 品牌数据模型
│   └── saleAttr.js     # 销售属性数据模型
├── services/product/
│   ├── SpuService.js   # SPU 业务逻辑
│   └── SkuService.js   # SKU 业务逻辑
├── controllers/product/
│   └── SpuController.js # SPU 控制器
├── routes/product/
│   └── spu.js          # SPU 路由配置
├── scripts/
│   └── initData.js     # 初始化数据脚本
└── app.js              # 主应用文件
```

## 注意事项

1. 确保 MongoDB 数据库已启动
2. 确保数据库连接配置正确
3. 删除 SPU 时会同时删除相关的 SKU
4. 所有接口都返回统一的响应格式：
   ```javascript
   {
     code: 200,
     message: "操作成功",
     ok: true,
     data: {...}
   }
   ```

## 错误处理

所有接口都包含完整的错误处理，当发生错误时会返回：
```javascript
{
  code: 500,
  message: "错误信息",
  ok: false
}
``` 