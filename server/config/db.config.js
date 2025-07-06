const mongoose = require("mongoose")

// MongoDB连接配置
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/operation-platform", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 超时时间
      socketTimeoutMS: 45000, // Socket超时
    })
    console.log('MongoDB连接成功')
  } catch (error) {
    console.error('MongoDB连接失败:', error.message)
    process.exit(1)
  }
}

// 监听连接事件
mongoose.connection.on('connected', () => {
  console.log('Mongoose连接成功')
})

mongoose.connection.on('error', (err) => {
  console.error('Mongoose连接错误:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose连接断开')
})

// 启动数据库连接
connectDB()

