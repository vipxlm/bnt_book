import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';

  const navItems = [
    { path: '/', icon: 'fas fa-home', label: '首页' },
    { path: '/my-bookings', icon: 'fas fa-calendar-alt', label: '预订' },
    { path: '/profile', icon: 'fas fa-user', label: '我的' }
  ];

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="max-w-md mx-auto bg-white min-h-screen relative pb-16">
        {/* Main Content */}
        <main className="p-4">
          <Outlet />
        </main>

        {/* Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray max-w-md mx-auto">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center p-2 ${location.pathname === item.path ? 'text-primary' : 'text-dark-gray'}`}
              >
                <i className={`${item.icon} text-xl mb-1`}></i>
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
