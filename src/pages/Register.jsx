import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0);
  const [formData, setFormData] = useState({
    phone: '',
    verificationCode: '',
    password: '',
    name: '',
    gender: '先生'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendCode = () => {
    if (countdown > 0 || !formData.phone || !/^1\d{10}$/.test(formData.phone)) return;
    
    // 这里添加发送验证码的逻辑
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里添加注册逻辑
    navigate('/login');
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