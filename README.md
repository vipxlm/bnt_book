# 餐厅预订系统

一个基于 React + Vite 构建的现代化餐厅预订系统，提供优雅的用户界面和流畅的预订体验。

## 功能特点

- 🔐 用户认证：支持用户注册和登录
- 🍽️ 餐厅浏览：展示餐厅详细信息，包括图片、价格和特色
- 📅 在线预订：支持在线预订座位，支付订金
- 📱 预订管理：查看、修改和取消预订
- 👤 个人中心：管理个人信息和预订历史

## 技术栈

- **前端框架**：React 18
- **构建工具**：Vite 6
- **路由管理**：React Router 6
- **样式解决方案**：Tailwind CSS
- **UI 组件**：Headless UI
- **图标库**：Font Awesome

## 开发环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

## 快速开始

1. 克隆项目

```bash
git clone [项目地址]
cd bnt_book
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 打开浏览器访问 http://localhost:5173

## 项目结构

```
src/
├── assets/      # 静态资源
├── pages/       # 页面组件
│   ├── Home/            # 首页
│   ├── RestaurantDetail/# 餐厅详情
│   ├── Booking/        # 预订流程
│   └── Profile/        # 个人中心
├── App.jsx     # 应用入口
├── main.jsx    # 主渲染文件
└── router.jsx  # 路由配置
```

## 可用的脚本命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建
- `npm run lint` - 运行 ESLint 检查

## 代码规范

项目使用 ESLint 进行代码规范检查，配置文件位于 `eslint.config.js`。主要规则包括：

- React Hooks 规则检查
- 未使用变量检查
- React 组件刷新规则

## 生产部署

1. 构建项目

```bash
npm run build
```

2. 构建完成后，`dist` 目录包含了可部署的文件

## 开发建议

- 使用 TypeScript 进行开发可以获得更好的类型检查
- 遵循组件化开发原则
- 使用 Tailwind CSS 工具类进行样式开发
- 保持代码整洁，遵循 ESLint 规范

## 许可证

[MIT License](LICENSE)
