import express from "express";
import mysql from "mysql2/promise";

const app = express();
const PORT = 4545;

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "#YnaQuI23",
  database: "thiswulong",
  port: 3306,
};

async function queryDatabase(sql: string) {
  let connection;
  try {
    // 创建数据库连接
    connection = await mysql.createConnection(dbConfig);
    // 执行查询
    const [rows] = await connection.execute(sql);
    return rows; // 返回查询结果
  } catch (error) {
    console.error("数据库查询失败:", error);
    throw error; // 抛出错误，让上层处理
  } finally {
    // 释放连接
    if (connection) {
      await connection.end();
    }
  }
}

app.get("/menuoptions", async (req, res) => {
  try {
    const sql = "select * from menuoptions";
    const data = await queryDatabase(sql);
    res.json({
      code: 200,
      message: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "error",
    });
  }
});
// 5. 处理跨域（如果前端和后端端口不同，必须配置）
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 允许所有源（生产环境需限制）
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 6. 启动服务
app.listen(PORT, () => {
  console.log(`服务已启动：http://localhost:${PORT}`);
});
