// 统一请求拦截器
const request = async (url, options = {}) => {
  // 获取token
  const token = localStorage.getItem('token');

  // 设置默认headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // 如果有token，添加到headers中
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 合并配置
  const config = {
    ...options,
    headers,
  };

  // API基础路径
  const baseURL = 'http://127.0.0.1:8000';
  const fullURL = url.startsWith('http') ? url : `${baseURL}${url}`;

  const response = await fetch(fullURL, config);
  
  // 检查响应内容类型
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error(`服务器返回了非JSON响应: ${text.substring(0, 100)}`);
  }

  const data = await response.json();

  // 处理token失效的情况
  if (data.status_code === 401) {
    // 清除token
    localStorage.removeItem('token');
    // 跳转到登录页面
    window.location.href = '/login';
    throw new Error('登录已过期，请重新登录');
  }

  if (!response.ok) {
    throw new Error(data.detail || `请求失败: ${response.status} ${response.statusText}`);
  }

  return data;
};

export default request;
