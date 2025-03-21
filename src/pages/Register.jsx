import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, API_ENDPOINTS } from '../config/config';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    gender: '先生',
    password: '',
    verificationCode: ''
  });
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleSendCode = async () => {
    if (countdown > 0 || !formData.phone || !/^1\d{10}$/.test(formData.phone)) return;

    try {
      const response = await fetch(`${API_URL}/auth/send-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone
        })
      });

      const data = await response.json();

      if (data.status_code === 200) {
        setCountdown(60);
      } else {
        setError(typeof data.detail === 'string' ? data.detail : '发送验证码失败，请重试');
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.auth.register}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          name: formData.name,
          gender: formData.gender,
          password: formData.password,
          verification_code: formData.verificationCode
        })
      });

      const data = await response.json();

      if (data.status_code === 200) {
        navigate('/login');
      } else {
        // 根据状态码显示对应的错误信息
        const errorMessage = typeof data.detail === 'string' ? data.detail : null;
        switch (data.status_code) {
          case 400:
            setError(errorMessage || '请求参数错误');
            break;
          case 401:
            setError(errorMessage || '未授权或登录已过期');
            break;
          case 403:
            setError(errorMessage || '权限不足');
            break;
          case 404:
            setError(errorMessage || '请求的资源不存在');
            break;
          case 500:
            setError(errorMessage || '服务器内部错误');
            break;
          default:
            setError(errorMessage || '注册失败，请重试');
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
          <h2 className="text-2xl font-bold text-text-base mb-1">味 · 发现</h2>
          <p className="text-dark-gray">创建新账号</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-base">手机号</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="请输入手机号"
              className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-base">验证码</label>
            <div className="flex gap-3">
              <input
                type="text"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleInputChange}
                placeholder="请输入验证码"
                className="flex-1 px-4 py-3 rounded-lg border border-gray focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={handleSendCode}
                disabled={countdown > 0 || !formData.phone || !/^1\d{10}$/.test(formData.phone)}
                className={`px-4 py-3 rounded-lg ${countdown > 0 ? 'bg-gray text-dark-gray' : 'bg-primary text-white'} font-medium whitespace-nowrap transition-colors ${!formData.phone || !/^1\d{10}$/.test(formData.phone) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
              >
                {countdown > 0 ? `${countdown}秒后重试` : '发送验证码'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-base">密码</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="请设置密码"
              className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-base">称呼</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="请输入您的称呼"
              className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-base">性别</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="先生"
                  checked={formData.gender === '先生'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary"
                />
                <span className="ml-2">先生</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="女士"
                  checked={formData.gender === '女士'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary"
                />
                <span className="ml-2">女士</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            注册
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
          >
            返回登录
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;