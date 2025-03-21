import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, API_ENDPOINTS } from '../config/config';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const formBody = new URLSearchParams();
      formBody.append('username', formData.username);
      formBody.append('password', formData.password);

      const response = await fetch(`${API_URL}${API_ENDPOINTS.auth.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
      });

      const data = await response.json();

      if (data.status_code === 200) {
        // 保存token
        localStorage.setItem('token', data.data.access_token);
        navigate('/');
      } else {
        // 根据状态码显示对应的错误信息
        switch (data.status_code) {
          case 400:
            setError(data.detail || '请求参数错误');
            break;
          case 401:
            setError(data.detail || '未授权或登录已过期');
            break;
          case 403:
            setError(data.detail || '权限不足');
            break;
          case 404:
            setError(data.detail || '请求的资源不存在');
            break;
          case 500:
            setError(data.detail || '服务器内部错误');
            break;
          default:
            setError(data.detail || '登录失败，请重试');
        }
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-utensils text-4xl text-white"></i>
          </div>
          <h2 className="text-2xl font-bold text-text-base mb-1">BNT · Book</h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-base">手机号</label>
            <input
              type="tel"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="请输入手机号"
              className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-base">密码</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="请输入密码"
              className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            登录
          </button>

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-full py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
          >
            注册新账号
          </button>
        </form>

        {/* Third-party Login */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-dark-gray">其他登录方式</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-6">
            <button className="p-3 rounded-full hover:bg-light-gray transition-colors">
              <i className="fab fa-weixin text-2xl" style={{ color: '#07C160' }}></i>
            </button>
            <button className="p-3 rounded-full hover:bg-light-gray transition-colors">
              <i className="fab fa-qq text-2xl text-[#2D8CF0]"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;