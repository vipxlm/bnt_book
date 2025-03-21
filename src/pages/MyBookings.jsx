import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  // 模拟预订数据
  const bookings = [
    {
      id: 1,
      restaurant: 'Table A Deli',
      date: '2025年3月5日',
      time: '12:30',
      guests: 3,
      deposit: 300,
      remainingPayment: 1854,
      status: 'upcoming',
      bookingNumber: 'BNC25032218654',
      restaurantInfo: {
        address: '上海市静安区南京西路829号',
        phone: '021-12345678'
      },
      notes: '无特殊要求',
      daysUntil: 3
    },
    {
      id: 2,
      restaurant: 'Table A Deli',
      date: '2025年2月15日',
      time: '19:00',
      guests: 2,
      deposit: 200,
      remainingPayment: 1236,
      status: 'completed',
      bookingNumber: 'BNC25021512345',
      restaurantInfo: {
        address: '上海市静安区南京西路829号',
        phone: '021-12345678'
      },
      notes: '靠窗座位',
      daysUntil: 0
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">我的预订</h2>

      {/* Booking Tabs */}
      <div className="flex border-b border-gray">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-2 px-4 -mb-px ${activeTab === 'upcoming' ? 'border-b-2 border-primary text-primary font-medium' : 'text-dark-gray'}`}
        >
          即将到来
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-2 px-4 -mb-px ${activeTab === 'history' ? 'border-b-2 border-primary text-primary font-medium' : 'text-dark-gray'}`}
        >
          历史预订
        </button>
      </div>

      {/* 预订列表 */}
      <div className="space-y-4">
        {bookings
          .filter(booking => activeTab === 'upcoming' ? booking.status === 'upcoming' : booking.status === 'completed')
          .map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md border border-gray/10 overflow-hidden">
            {/* 预订状态条 */}
            {booking.status === 'upcoming' && (
              <div className="bg-primary/10 text-primary px-4 py-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">即将到来</div>
                  <div className="text-sm">距离用餐还有 {booking.daysUntil} 天</div>
                </div>
              </div>
            )}
            {booking.status === 'completed' && (
              <div className="bg-gray-500/10 text-gray-500 px-4 py-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">已完成</div>
                </div>
              </div>
            )}
            
            {/* 预订内容 */}
            <div className="p-4 space-y-4">
              {/* 餐厅信息 */}
              <div className="flex items-start gap-4">
                <i className="fas fa-building mt-1 text-primary"></i>
                <div>
                  <div className="font-medium text-lg">{booking.restaurant}</div>
                  <div className="text-sm text-dark-gray mt-1">{booking.restaurantInfo.address}</div>
                </div>
              </div>
              
              <div className="h-px bg-gray/10"></div>
              
              {/* 预订详情 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-calendar-alt mt-1 text-primary"></i>
                  <div>
                    <div className="text-sm text-dark-gray">日期</div>
                    <div className="font-medium">{booking.date}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <i className="fas fa-clock mt-1 text-primary"></i>
                  <div>
                    <div className="text-sm text-dark-gray">时间</div>
                    <div className="font-medium">{booking.time}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <i className="fas fa-user-friends mt-1 text-primary"></i>
                  <div>
                    <div className="text-sm text-dark-gray">人数</div>
                    <div className="font-medium">{booking.guests}人</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <i className="fas fa-ticket-alt mt-1 text-primary"></i>
                  <div>
                    <div className="text-sm text-dark-gray">预订号</div>
                    <div className="font-medium">{booking.bookingNumber}</div>
                  </div>
                </div>
              </div>
              
              <div className="h-px bg-gray/10"></div>
              
              {/* 支付信息 */}
              <div className="flex items-start gap-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-money-bill-wave mt-1 text-primary"></i>
                  <div>
                    <div className="text-sm text-dark-gray">已付订金</div>
                    <div className="font-medium">¥{booking.deposit}</div>
                  </div>
                </div>
                
                {booking.status === 'upcoming' && (
                  <div className="flex items-start gap-3">
                    <i className="fas fa-coins mt-1 text-primary"></i>
                    <div>
                      <div className="text-sm text-dark-gray">到店需付</div>
                      <div className="font-medium text-price">¥{booking.remainingPayment}</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 操作按钮 */}
              <div className="flex gap-3 pt-2">
                {booking.status === 'upcoming' && (
                  <button
                    onClick={() => navigate(`/booking/${booking.id}/modify`)}
                    className="flex-1 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <i className="fas fa-edit mr-2"></i>修改
                  </button>
                )}
                <button
                  onClick={() => navigate(`/booking/${booking.id}/detail`)}
                  className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  <i className="fas fa-info-circle mr-2"></i>查看详情
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* 无预订时显示 */}
        {bookings.filter(booking => activeTab === 'upcoming' ? booking.status === 'upcoming' : booking.status === 'completed').length === 0 && (
          <div className="text-center py-12 bg-light-gray rounded-lg">
            <div className="text-dark-gray mb-4">
              <i className="fas fa-calendar-times text-4xl"></i>
            </div>
            <p className="text-dark-gray">{activeTab === 'upcoming' ? '您暂无即将到来的预订' : '您暂无历史预订记录'}</p>
            {activeTab === 'upcoming' && (
              <button 
                onClick={() => navigate('/')}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                立即预订
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;