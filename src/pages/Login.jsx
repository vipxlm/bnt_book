import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 这里添加登录逻辑
    navigate('/');
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-base">手机号</label>
            <input
              type="tel"
              placeholder="请输入手机号"
              className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-base">密码</label>
            <input
              type="password"
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