import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import request from '../utils/request';

function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
  const [guestCount, setGuestCount] = useState(2);
  const [showPreview, setShowPreview] = useState(false);
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1:日期 2:时间 3:备注和确认
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [priceInfo, setPriceInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const calendarRef = useRef(null);

  // 日历数据
  const daysOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  
  // 检查日期是否不可用
  const isDateUnavailable = (dateStr) => {
    const dateInfo = availableDates.find(d => d.date === dateStr);
    return dateInfo ? dateInfo.is_unavailable : false;
  };
  
  // 获取日期状态信息
  const getDateStatus = (dateStr) => {
    const dateInfo = availableDates.find(d => d.date === dateStr);
    return dateInfo ? dateInfo.status : null;
  };
  
  // 当前用户信息
  const currentUser = {
    name: name || '',
    phone: phone || ''
  };

  // 处理日期选择
  const handleDateSelect = (dateStr) => {
    setSelectedDate(dateStr);
    setShowCalendar(false);
    setSelectedTime('');
    setSelectedTimeSlotId(null);
    setBookingStep(2); // 进入时间段选择步骤
  };

  // 获取当月的日期数组
  const getDaysInMonth = (year, month) => {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // 添加上个月的日期
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
      const date = new Date(year, month - 1, prevMonthDays - firstDay + i + 1);
      days.push({
        date,
        isCurrentMonth: false,
        isSelected: false,
        isToday: false,
        isUnavailable: false,
        status: null
      });
    }
    
    // 添加当月的日期
    const today = new Date();
    const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateStr = formatDate(date);
      const unavailable = isDateUnavailable(dateStr);
      days.push({
        date,
        isCurrentMonth: true,
        isSelected: selectedDateObj && 
                    selectedDateObj.getFullYear() === date.getFullYear() && 
                    selectedDateObj.getMonth() === date.getMonth() && 
                    selectedDateObj.getDate() === date.getDate(),
        isToday: today.getFullYear() === date.getFullYear() && 
                today.getMonth() === date.getMonth() && 
                today.getDate() === date.getDate(),
        isUnavailable: unavailable || date < today,
        status: getDateStatus(dateStr)
      });
    }
    
    // 添加下个月的日期以填充网格
    const remainingDays = 42 - days.length; // 6行7列 = 42个日期格子
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isSelected: false,
        isToday: false,
        isUnavailable: false,
        status: null
      });
    }
    
    return days;
  };

  // 切换月份
  const changeMonth = (increment) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };

  // 格式化日期为YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 获取餐厅信息
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await request(`/api/v1/restaurants/${id}`);
        setRestaurant(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRestaurant();
    }
  }, [id]);

  // 获取可预订日期
  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        setLoading(true);
        setError(null);
        const month = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
        const data = await request(`/api/v1/restaurants/${id}/available-dates?month=${month}`);
        setAvailableDates(data.data.dates);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAvailableDates();
    }
  }, [id, currentMonth]);

  // 获取时间段
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await request(`/api/v1/restaurants/${id}/time-slots?date=${selectedDate}&guest_count=${guestCount}`);
        setTimeSlots(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id && selectedDate && guestCount) {
      fetchTimeSlots();
    }
  }, [id, selectedDate, guestCount]);

  // 计算价格
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await request(`/api/v1/restaurants/${id}/calculate-price?guest_count=${guestCount}`);
        setPriceInfo({
          deposit_per_person: data.data.deposit_per_person,
          price_per_person: data.data.price_per_person,
          total_deposit: data.data.total_deposit,
          remaining_payment: data.data.remaining_payment,
          total_amount: data.data.total_amount
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id && guestCount) {
      fetchPrice();
    }
  }, [id, guestCount]);

  // 获取用户信息
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login', { state: { from: location.pathname } });
          return;
        }

        const userData = await request('/api/v1/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!userData || !userData.id || typeof userData.name === 'undefined' || typeof userData.phone === 'undefined') {
          throw new Error('用户信息格式不正确: 缺少必要字段');
        }

        setName(userData.name);
        setPhone(userData.phone);
      } catch (err) {
        console.error('获取用户信息失败:', err);
        // 检查是否是服务器返回HTML错误页面
        if (err.message.includes('服务器返回了非JSON响应')) {
          setError('服务器错误，请稍后再试');
        } else if (err.message.includes('登录已过期')) {
          setError('登录已过期，请重新登录');
        } else {
          setError('获取用户信息失败: ' + err.message);
        }
        localStorage.removeItem('token');
        navigate('/login', { state: { from: location.pathname } });
      }
    };

    fetchUserInfo();
  }, [navigate, location.pathname]);

  // 点击外部关闭日历
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = () => {
    if (!name || !phone || !selectedDate || !selectedTimeSlotId) {
      setError('请填写完整预订信息');
      return;
    }
    setShowPreview(true);
  };

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await request('/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify({
          restaurant_id: id,
          booking_date: selectedDate,
          time_slot_id: selectedTimeSlotId,
          guest_count: guestCount,
          name,
          phone,
          notes: note
        })
      });

      if (!data) {
        throw new Error('预订失败');
      }

      navigate('/booking-confirmation', { state: { bookingNumber: data.data.booking_number } });
    } catch (err) {
      setError(err.message);
      setShowPreview(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-text-base"
        >
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg">
          <div className="flex items-center gap-2">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
        </div>
      )}

      {restaurant && (
        <>
          <h2 className="text-xl font-bold">预订餐厅</h2>
          <div className="text-2xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            {restaurant.name}
          </div>
        
        </>
      )}

      {/* Progress Steps */}
      <div className="flex justify-between items-center py-4">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mb-2">1</div>
          <span className="text-xs text-dark-gray">选择餐厅</span>
        </div>
        <div className="flex-1 h-0.5 bg-primary mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mb-2">2</div>
          <span className="text-xs text-primary font-medium">预订信息</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray text-dark-gray flex items-center justify-center mb-2">3</div>
          <span className="text-xs text-dark-gray">确认预订</span>
        </div>
      </div>

      {/* Booking Form */}
      <div className="space-y-4">
        {/* 个人信息 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-base">预订人信息</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="您的称呼"
                className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:border-primary bg-white"
              />
            </div>
            <div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="您的手机号"
                className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:border-primary bg-white"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 relative">
            <label className="block text-sm font-medium text-text-base">预订日期</label>
            <div className="relative">
              <input
                type="text"
                value={selectedDate ? selectedDate.replace(/-/g, '年').replace(/-/, '月') + '日' : ''}
                readOnly
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:border-primary bg-white cursor-pointer"
                placeholder="请选择日期"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <i className="fas fa-calendar-alt text-primary"></i>
              </div>
            </div>
            
            {/* 自定义日历控件 - 全屏浮层 */}
            {showCalendar && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div 
                  ref={calendarRef}
                  className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => setShowCalendar(false)}
                      className="text-dark-gray hover:text-primary"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    <h3 className="text-lg font-bold">选择日期</h3>
                    <div className="w-5"></div> {/* 占位元素，保持标题居中 */}
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <button 
                      onClick={() => changeMonth(-1)}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-dark-gray hover:bg-light-gray"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <div className="font-bold text-lg">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </div>
                    <button 
                      onClick={() => changeMonth(1)}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-dark-gray hover:bg-light-gray"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {daysOfWeek.map((day, index) => (
                      <div key={index} className="text-sm font-medium text-dark-gray py-2">
                        {day}
                      </div>
                    ))}
                    
                    {getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth()).map((day, index) => (
                      <div key={index} className="relative">
                        <button
                          onClick={() => !day.isUnavailable && day.date >= new Date() && handleDateSelect(formatDate(day.date))}
                          disabled={day.date < new Date() || day.isUnavailable}
                          className={`
                            w-11 h-11 rounded-full flex items-center justify-center text-sm relative
                            ${day.isSelected ? 'bg-primary text-white' : ''} 
                            ${!day.isCurrentMonth ? 'text-gray-300' : ''} 
                            ${day.isToday ? 'border-2 border-primary' : ''} 
                            ${(day.date < new Date() || day.isUnavailable) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/10'}
                          `}
                        >
                          {day.date.getDate()}
                        </button>
                        {day.isUnavailable && day.isCurrentMonth && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs px-1 py-0.5 bg-red-100 text-red-500 rounded-sm whitespace-nowrap">
                            {day.status}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2 flex justify-between items-center text-sm text-dark-gray">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-primary"></div>
                      <span>今天</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>已选</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-100"></div>
                      <span>不可选</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-base">用餐人数</label>
            <div className="relative">
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:border-primary bg-white appearance-none cursor-pointer"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}人</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-primary">
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
        </div>

        {/* 时间选择 - 步骤2 */}
        {bookingStep >= 2 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-base">预订时间</label>
            {timeSlots.length > 0 ? (
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => {
                      setSelectedTime(`${slot.start_time}-${slot.end_time}`);
                      setSelectedTimeSlotId(slot.id);
                      setBookingStep(3);
                    }}
                    disabled={!slot.available}
                    className={`py-2 px-3 rounded-lg text-sm transition-colors ${selectedTime === `${slot.start_time}-${slot.end_time}` ? 'bg-primary text-white' : slot.available ? 'bg-light-gray text-dark-gray hover:bg-primary/10' : 'bg-gray/20 text-gray cursor-not-allowed'}`}
                  >
                    {slot.start_time}-{slot.end_time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                当日已约满，请选择其他日期
              </div>
            )}
          </div>
        )}

        {/* 备注信息 - 步骤3 */}
        {bookingStep >= 3 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-base">备注信息</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="请填写您的特殊需求，如：餐桌位置偏好、过敏原等"
              className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:border-primary resize-none h-24"
            />
          </div>
        )}

        {/* 费用明细 - 步骤3 */}
        {bookingStep >= 3 && (
          <div className="bg-light-gray p-5 rounded-lg space-y-3 border border-gray/20">
            <div className="flex justify-between items-center">
              <span className="text-dark-gray font-medium">费用明细</span>
              <span className="text-xs text-primary">预付订金，到店支付余额</span>
            </div>
            <div className="h-px bg-gray/20 my-1"></div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-dark-gray">订金</span>
                <span className="text-xs text-dark-gray ml-2">¥{priceInfo?.deposit_per_person || 0} × {guestCount}人</span>
              </div>
              <span className="text-lg font-medium text-price">¥{priceInfo?.total_deposit || 0}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-dark-gray">到店需付</span>
              <span className="font-medium">¥{priceInfo?.remaining_payment || 0}</span>
            </div>
            <div className="h-px bg-gray/20 my-1"></div>
            <div className="flex justify-between items-center">
              <span className="text-dark-gray font-medium">总价</span>
              <span className="text-lg font-bold text-price">¥{priceInfo?.total_amount || 0}</span>
            </div>
          </div>
        )}
      </div>

      {/* 提交按钮 - 只在最后一步显示确认预订 */}
      <div className="pt-6">
        {bookingStep === 3 && (
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            确认预订
          </button>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-6">
            <h3 className="text-xl font-bold">预订信息确认</h3>
            
            <div className="space-y-4">
              <div className="bg-light-gray p-4 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <i className="fas fa-user mt-1 text-primary"></i>
                  <div>
                    <div className="text-sm text-dark-gray">预订人</div>
                    <div>{name || currentUser.name}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-phone mt-1 text-primary"></i>
                  <div>
                    <div className="text-sm text-dark-gray">联系电话</div>
                    <div>{(phone || currentUser.phone).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</div>
                  </div>
                </div>
              </div>

              <div className="bg-light-gray p-4 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <i className="fas fa-building mt-1 text-primary"></i>
                  <div>
                    <div className="text-sm text-dark-gray">餐厅</div>
                    <div>{restaurant.name}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-calendar-alt mt-1 text-primary"></i>
                  <div>
                    <div className="text-sm text-dark-gray">日期</div>
                    <div>{selectedDate.replace(/-/g, '年').replace(/-/, '月') + '日'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-clock mt-1 text-primary"></i>
                  <div>
                    <div className="text-sm text-dark-gray">时间</div>
                    <div>{selectedTime}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-user-friends mt-1 text-primary"></i>
                  <div>
                    <div className="text-sm text-dark-gray">人数</div>
                    <div>{guestCount}人</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-money-bill-wave mt-1 text-primary"></i>
                  <div>
                    <div className="text-sm text-dark-gray">订金</div>
                    <div>¥{(priceInfo?.total_deposit || 0).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
              >
                返回修改
              </button>
              <button
                onClick={handleConfirmBooking}
                className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                确认提交
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
