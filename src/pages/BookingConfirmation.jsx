import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const bookingNumber = location.state?.bookingNumber;
        if (!bookingNumber) {
          throw new Error('预订号不存在');
        }

        const response = await fetch(`/api/v1/bookings/${bookingNumber}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail || '获取预订详情失败');
        }
        setBookingDetails(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [location.state]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="text-red-500">{error}</div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          返回首页
        </button>
      </div>
    );
  }

  if (!bookingDetails) return null;

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-check-circle text-4xl text-primary"></i>
        </div>
        <h2 className="text-2xl font-bold text-text-base mb-2">预订成功</h2>
        <p className="text-dark-gray">您已成功预订{bookingDetails.restaurant.name}</p>
      </div>

      {/* Booking Details */}
      <div className="bg-light-gray rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-4">
          <i className="fas fa-building mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">餐厅</div>
            <div className="font-medium">{bookingDetails.restaurant.name}</div>
            <div className="text-xs text-dark-gray mt-1">{bookingDetails.restaurant.address}</div>
            <div className="text-xs text-dark-gray">
              {bookingDetails.restaurant.phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') || ''}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="fas fa-calendar-alt mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">日期</div>
            <div className="font-medium">
              {bookingDetails.formatted_date || 
               (bookingDetails.date && bookingDetails.date.replace(/-/g, '年').replace(/-/, '月') + '日')}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="fas fa-clock mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">时间</div>
            <div className="font-medium">{bookingDetails.time_slot.name} {bookingDetails.time_slot.start_time}-{bookingDetails.time_slot.end_time}</div>
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
            <div className="font-medium">¥{(bookingDetails.deposit_amount || 0).toFixed(2)}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="fas fa-ticket-alt mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">预订号</div>
            <div className="font-medium">{bookingDetails.booking_number}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="fas fa-money-bill-wave mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">到店需付</div>
            <div className="font-medium">¥{(bookingDetails.remaining_payment || 0).toFixed(2)}</div>
          </div>
        </div>

        {bookingDetails.qr_code && (
          <div className="flex flex-col items-center pt-4">
            <img src={bookingDetails.qr_code} alt="预订二维码" className="w-32 h-32" />
            <div className="text-xs text-dark-gray mt-2">
              有效至: {new Date(bookingDetails.valid_until).toLocaleString()}
            </div>
          </div>
        )}
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
