// 导入必要的模块
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import type { MenuOption, newMenuOption } from "./types/GetMenuOptions";

const app = express();
const PORT = 4545;

// 配置数据库
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "#YnaQuI23",
  database: "thiswulong",
  port: 3306,
};

// 配置请求数据
app.use(
  cors({
    origin: "http://localhost:5173", // 明确指定允许的前端地址（推荐，更安全）
    methods: ["GET", "POST", "PUT", "DELETE"], // 允许的请求方法
    allowedHeaders: ["Content-Type"], // 允许的请求头
  })
);

// 定义数据库查询函数
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

// 配置查询路由
app.get("/menuoptions", async (req, res) => {
  try {
    // 构建查询SQL语句
    const sql =
      "SELECT `key`, `label`, `href`, `parent_key` FROM menuoptions ORDER BY `parent_key`, sort_order;";
    const data = await queryDatabase(sql);

    const items = data as MenuOption[];
    // 1. 建立映射表，同时移除parent_key并初始化children
    const nodeMap: Record<string, newMenuOption> = {};
    items.forEach((item) => {
      // 解构排除parent_key，保留其他属性
      const { parent_key, ...rest } = item;
      nodeMap[item.key] = { ...rest, children: [] };
    });

    // 2. 关联父子关系（逻辑不变）
    const treeData: newMenuOption[] = [];
    items.forEach((item) => {
      const currentNode = nodeMap[item.key];
      if (item.parent_key) {
        // 这里仍用item的parent_key判断父节点，但最终节点不包含该字段
        const parentNode = nodeMap[item.parent_key];
        if (parentNode) {
          parentNode.children.push(currentNode);
        } else {
          treeData.push(currentNode);
        }
      } else {
        treeData.push(currentNode);
      }
    });

    res.json({
      code: 200,
      message: "success",
      data: treeData,
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
