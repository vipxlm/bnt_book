import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ModifyBooking() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 模拟原预订数据
  const originalBooking = {
    id: 1,
    restaurant: 'Table A Deli',
    date: '2025-03-05',
    time: '12:30',
    guests: 3,
    deposit: 300,
    bookingNumber: 'BNC25032218654'
  };

  const [date, setDate] = useState(originalBooking.date);
  const [time, setTime] = useState(originalBooking.time);
  const [guests, setGuests] = useState(originalBooking.guests);

  // 可选时间段
  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 实现修改预订逻辑
    if (window.confirm('确定要修改预订信息吗？')) {
      navigate(`/booking/${id}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* 返回按钮和标题 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-light-gray"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-xl font-bold">修改预订</h1>
      </div>

      {/* 餐厅信息 */}
      <div className="bg-light-gray rounded-lg p-4">
        <div className="font-medium">{originalBooking.restaurant}</div>
        <div className="text-sm text-dark-gray mt-1">预订号：{originalBooking.bookingNumber}</div>
      </div>

      {/* 修改表单 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* 日期选择 */}
          <div>
            <label className="block text-sm font-medium mb-2">选择日期</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 rounded-lg border border-gray focus:outline-none focus:border-primary"
              required
            />
          </div>

          {/* 时间选择 */}
          <div>
            <label className="block text-sm font-medium mb-2">选择时间</label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`py-2 rounded-lg text-sm ${time === slot ? 'bg-primary text-white' : 'bg-light-gray text-dark-gray'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* 人数选择 */}
          <div>
            <label className="block text-sm font-medium mb-2">用餐人数</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-10 h-10 rounded-lg bg-light-gray flex items-center justify-center"
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="text-lg font-medium">{guests}人</span>
              <button
                type="button"
                onClick={() => setGuests(Math.min(10, guests + 1))}
                className="w-10 h-10 rounded-lg bg-light-gray flex items-center justify-center"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        {/* 提示信息 */}
        <div className="bg-light-gray rounded-lg p-4 text-sm text-dark-gray">
          <p>• 修改预订信息不会额外收取费用</p>
          <p>• 如果增加用餐人数，需要补交相应订金</p>
          <p>• 建议至少提前 24 小时修改预订</p>
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          确认修改
        </button>
      </form>
    </div>
  );
}

export default ModifyBooking;