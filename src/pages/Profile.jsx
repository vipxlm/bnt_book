import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const userInfo = {
    name: '张三',
    phone: '138****8888',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  };

  const menuItems = [
    { icon: 'fas fa-history', label: '历史预订' },
    { icon: 'fas fa-cog', label: '设置' },
    { icon: 'fas fa-question-circle', label: '帮助中心' }
  ];

  return (
    <div className="space-y-6">
      {/* User Info - Enhanced */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray/10">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary/20">
            <img
              src={userInfo.avatar}
              alt="头像"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">{userInfo.name}</h2>
          <p className="text-dark-gray mt-1">{userInfo.phone}</p>
        </div>
        
        {/* Stats - Only showing history bookings */}
        <div className="bg-light-gray/50 rounded-xl p-4 flex items-center justify-center">
          <div className="text-center flex items-center gap-3">
            <i className="fas fa-calendar-check text-primary text-xl"></i>
            <div>
              <div className="text-xl font-bold">8</div>
              <div className="text-sm text-dark-gray">历史预订</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu - Redesigned */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray/10">
        <h3 className="text-lg font-medium px-2 mb-3">账户管理</h3>
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-light-gray/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <i className={`${item.icon} text-primary`}></i>
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <i className="fas fa-chevron-right text-dark-gray"></i>
            </button>
          ))}
        </div>
      </div>

      {/* Logout Button - Enhanced */}
      <button
        onClick={() => navigate('/login')}
        className="w-full py-4 mt-4 border border-primary text-primary rounded-xl font-medium hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
      >
        <i className="fas fa-sign-out-alt"></i>
        退出登录
      </button>
    </div>
  );
}

export default Profile;