// 测试路由是否正常工作的脚本
const express = require('express');
const app = express();

// 模拟请求测试
app.use(express.json());

// 测试路由
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// 启动测试服务器
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log('Routes to test:');
  console.log('GET /test');
  console.log('GET /api/admin/product/baseTrademark/1/3');
  console.log('POST /api/admin/product/baseTrademark/save');
  console.log('PUT /api/admin/product/baseTrademark/update');
  console.log('DELETE /api/admin/product/baseTrademark/remove/1');
  console.log('POST /api/admin/product/fileUpload');
}); 