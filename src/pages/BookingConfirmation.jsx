import { useNavigate } from 'react-router-dom';

function BookingConfirmation() {
  const navigate = useNavigate();

  const bookingDetails = {
    restaurant: 'Table A Deli',
    date: '2025年3月5日',
    time: '12:30',
    guests: 2,
    deposit: 400,
    bookingNumber: 'BNC25032218654'
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-check-circle text-4xl text-primary"></i>
        </div>
        <h2 className="text-2xl font-bold text-text-base mb-2">预订成功</h2>
        <p className="text-dark-gray">您已成功预订{bookingDetails.restaurant}</p>
      </div>

      {/* Booking Details */}
      <div className="bg-light-gray rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-4">
          <i className="fas fa-building mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">餐厅</div>
            <div className="font-medium">{bookingDetails.restaurant}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="fas fa-calendar-alt mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">日期</div>
            <div className="font-medium">{bookingDetails.date}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="fas fa-clock mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">时间</div>
            <div className="font-medium">{bookingDetails.time}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="fas fa-user-friends mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">人数</div>
            <div className="font-medium">{bookingDetails.guests}人</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="fas fa-money-bill-wave mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">已付订金</div>
            <div className="font-medium">¥{bookingDetails.deposit}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="fas fa-ticket-alt mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">预订号</div>
            <div className="font-medium">{bookingDetails.bookingNumber}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => navigate('/my-bookings')}
          className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          查看我的预订
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
        >
          返回首页
        </button>
      </div>
    </div>
  );
}

export default BookingConfirmation;