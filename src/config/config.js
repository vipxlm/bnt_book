// API配置文件

// 开发环境API地址
const DEV_API_URL = 'http://127.0.0.1:8000/api/v1';

// 测试环境API地址
const TEST_API_URL = 'http://127.0.0.1:8000/api/v1';

// 生产环境API地址
const PROD_API_URL = 'http://127.0.0.1:8000/api/v1';

// 根据当前环境选择API地址
const API_URL = process.env.NODE_ENV === 'production'
  ? PROD_API_URL
  : process.env.NODE_ENV === 'test'
    ? TEST_API_URL
    : DEV_API_URL;

// API端点配置
const API_ENDPOINTS = {
  // 认证相关
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  // 餐厅相关
  restaurants: {
    list: '/restaurants',
    detail: (id) => `/restaurants/${id}`,
  },
  // 预订相关
  bookings: {
    create: '/bookings',
    list: '/bookings',
    detail: (id) => `/bookings/${id}`,
    update: (id) => `/bookings/${id}`,
    cancel: (id) => `/bookings/${id}`,
  },
  // 用户相关
  user: {
    profile: '/user/profile',
    updateProfile: '/user/profile',
  },
};

// 导出配置
export {
  API_URL,
  API_ENDPOINTS,
};