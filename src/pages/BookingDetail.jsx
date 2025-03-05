import { useNavigate, useParams } from 'react-router-dom';

function BookingDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 模拟预订数据
  const booking = {
    id: 1,
    restaurant: 'Table A Deli',
    date: '2025年3月5日',
    time: '12:30',
    guests: 3,
    deposit: 300,
    remainingPayment: 1554,
    status: 'upcoming',
    bookingNumber: 'BNC25032218654',
    restaurantInfo: {
      address: '上海市静安区南京西路829号',
      phone: '021-12345678'
    },
    notes: '无特殊要求'
  };

  const handleModify = () => {
    navigate(`/booking/${id}/modify`);
  };

  const handleCancel = () => {
    // 显示取消预订确认对话框
    if (window.confirm('确定要取消预订吗？订金将根据取消政策进行退还。')) {
      // TODO: 实现取消预订逻辑
      navigate('/my-bookings');
    }
  };

  return (
    <div className="space-y-6">
      {/* 返回按钮 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-light-gray"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-xl font-bold">预订详情</h1>
      </div>

      {/* 预订状态 */}
      <div className="bg-primary/10 text-primary px-4 py-3 rounded-lg">
        <div className="font-medium">即将到来</div>
        <div className="text-sm mt-1">距离用餐还有 3 天</div>
      </div>

      {/* 预订信息 */}
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-5 border border-gray/10">
        <div className="flex items-start gap-4">
          <i className="fas fa-building mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">餐厅</div>
            <div className="font-medium text-lg">{booking.restaurant}</div>
            <div className="text-sm text-dark-gray mt-2">{booking.restaurantInfo.address}</div>
            <div className="text-sm text-dark-gray">{booking.restaurantInfo.phone}</div>
          </div>
        </div>

        <div className="h-px bg-gray/10"></div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <i className="fas fa-calendar-alt mt-1 text-primary"></i>
            <div>
              <div className="text-sm text-dark-gray">日期</div>
              <div className="font-medium">{booking.date}</div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <i className="fas fa-clock mt-1 text-primary"></i>
            <div>
              <div className="text-sm text-dark-gray">时间</div>
              <div className="font-medium">{booking.time}</div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <i className="fas fa-user-friends mt-1 text-primary"></i>
            <div>
              <div className="text-sm text-dark-gray">人数</div>
              <div className="font-medium">{booking.guests}人</div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <i className="fas fa-ticket-alt mt-1 text-primary"></i>
            <div>
              <div className="text-sm text-dark-gray">预订号</div>
              <div className="font-medium">{booking.bookingNumber}</div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray/10"></div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <i className="fas fa-money-bill-wave mt-1 text-primary"></i>
            <div>
              <div className="text-sm text-dark-gray">已付订金</div>
              <div className="font-medium text-lg">¥{booking.deposit}</div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <i className="fas fa-coins mt-1 text-primary"></i>
            <div>
              <div className="text-sm text-dark-gray">到店需付</div>
              <div className="font-medium text-lg text-price">¥{booking.remainingPayment}</div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray/10"></div>

        <div className="flex items-start gap-4">
          <i className="fas fa-comment mt-1 text-primary"></i>
          <div>
            <div className="text-sm text-dark-gray">备注</div>
            <div className="font-medium">{booking.notes}</div>
          </div>
        </div>
      </div>

      {/* 预订须知 */}
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 border border-gray/10">
        <h3 className="font-medium text-lg flex items-center gap-2">
          <i className="fas fa-info-circle text-primary"></i>
          预订须知
        </h3>
        <div className="space-y-3 text-sm text-dark-gray">
          <div className="space-y-2">
            <div className="font-medium text-text-base">用餐时间</div>
            <p>• 午市用餐时间为 90 分钟，晚市用餐时间为 120 分钟</p>
            <p>• 请按预订时间准时到店，迟到超过 15 分钟将视为主动放弃预订</p>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-text-base">预订规则</div>
            <p>• 每位顾客需支付 200 元订金</p>
            <p>• 如需修改预订，建议提前 24 小时联系餐厅</p>
            <p>• 如需取消预订，请查看取消政策</p>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-text-base">用餐提醒</div>
            <p>• 如有特殊饮食要求，请提前告知</p>
            <p>• 建议您提前 5-10 分钟到达餐厅</p>
            <p>• 未成年人请在监护人陪同下用餐</p>
          </div>
        </div>
      </div>

      {/* 取消政策 */}
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 border border-gray/10">
        <h3 className="font-medium text-lg flex items-center gap-2">
          <i className="fas fa-shield-alt text-primary"></i>
          取消政策
        </h3>
        <ul className="text-sm text-dark-gray space-y-2">
          <li>• 就餐前 24 小时以上取消，全额退还订金</li>
          <li>• 就餐前 12-24 小时取消，退还订金的 50%</li>
          <li>• 就餐前 12 小时内取消，订金不予退还</li>
        </ul>
      </div>

      {/* 操作按钮 */}
      <div className="space-y-3 pt-4">
        <button
          onClick={handleModify}
          className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          修改预订
        </button>
        <button
          onClick={handleCancel}
          className="w-full py-3 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-colors"
        >
          取消预订
        </button>
      </div>
    </div>
  );
}

export default BookingDetail;