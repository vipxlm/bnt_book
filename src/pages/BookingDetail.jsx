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
    <div className="space-y-4">
      {/* 返回按钮和标题 */}
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-light-gray"
        >
          <i className="fas fa-arrow-left text-sm"></i>
        </button>
        <h1 className="text-lg font-bold">预订详情</h1>
      </div>

      {/* 预订状态 */}
      <div className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm">
        <div className="font-medium">即将到来</div>
        <div className="text-xs mt-0.5">距离用餐还有 3 天</div>
      </div>

      {/* 预订信息 */}
      <div className="bg-white shadow-sm rounded-xl p-4 space-y-3 border border-gray/10">
        <div className="flex items-start gap-3">
          <i className="fas fa-building mt-1 text-primary text-sm"></i>
          <div className="flex-1">
            <div className="text-xs text-dark-gray">餐厅</div>
            <div className="font-medium">{booking.restaurant}</div>
            <div className="text-xs text-dark-gray mt-1">{booking.restaurantInfo.address}</div>
            <div className="text-xs text-dark-gray">{booking.restaurantInfo.phone}</div>
          </div>
        </div>

        <div className="h-px bg-gray/10"></div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: 'calendar-alt', label: '日期', value: booking.date },
            { icon: 'clock', label: '时间', value: booking.time },
            { icon: 'user-friends', label: '人数', value: `${booking.guests}人` },
            { icon: 'ticket-alt', label: '预订号', value: booking.bookingNumber }
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <i className={`fas fa-${item.icon} mt-1 text-primary text-sm`}></i>
              <div>
                <div className="text-xs text-dark-gray">{item.label}</div>
                <div className="font-medium text-sm">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-gray/10"></div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <i className="fas fa-money-bill-wave mt-1 text-primary text-sm"></i>
            <div>
              <div className="text-xs text-dark-gray">已付订金</div>
              <div className="font-medium">¥{booking.deposit}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <i className="fas fa-coins mt-1 text-primary text-sm"></i>
            <div>
              <div className="text-xs text-dark-gray">到店需付</div>
              <div className="font-medium text-price">¥{booking.remainingPayment}</div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray/10"></div>

        <div className="flex items-start gap-2">
          <i className="fas fa-comment mt-1 text-primary text-sm"></i>
          <div>
            <div className="text-xs text-dark-gray">备注</div>
            <div className="font-medium text-sm">{booking.notes}</div>
          </div>
        </div>
      </div>

      {/* 预订须知和取消政策 */}
      <div className="bg-white shadow-sm rounded-xl p-4 space-y-4 border border-gray/10">
        <div className="space-y-3">
          <h3 className="font-medium text-base flex items-center gap-2">
            <i className="fas fa-info-circle text-primary text-sm"></i>
            预订须知
          </h3>
          <div className="space-y-2 text-xs text-dark-gray">
            {[
              {
                title: '用餐时间',
                items: [
                  '午市用餐时间为 90 分钟，晚市用餐时间为 120 分钟',
                  '请按预订时间准时到店，迟到超过 15 分钟将视为主动放弃预订'
                ]
              },
              {
                title: '预订规则',
                items: [
                  '每位顾客需支付 200 元订金',
                  '如需修改预订，建议提前 24 小时联系餐厅',
                  '如需取消预订，请查看取消政策'
                ]
              },
              {
                title: '用餐提醒',
                items: [
                  '如有特殊饮食要求，请提前告知',
                  '建议您提前 5-10 分钟到达餐厅',
                  '未成年人请在监护人陪同下用餐'
                ]
              }
            ].map((section, index) => (
              <div key={index} className="space-y-1">
                <div className="font-medium text-text-base text-sm">{section.title}</div>
                {section.items.map((item, idx) => (
                  <p key={idx}>• {item}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray/10"></div>

        <div className="space-y-2">
          <h3 className="font-medium text-base flex items-center gap-2">
            <i className="fas fa-shield-alt text-primary text-sm"></i>
            取消政策
          </h3>
          <ul className="text-xs text-dark-gray space-y-1">
            <li>• 就餐前 24 小时以上取消，全额退还订金</li>
            <li>• 就餐前 12-24 小时取消，退还订金的 50%</li>
            <li>• 就餐前 12 小时内取消，订金不予退还</li>
          </ul>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={handleModify}
          className="flex-1 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-opacity-90 transition-colors"
        >
          修改预订
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 py-2.5 border border-red-500 text-red-500 rounded-lg font-medium text-sm hover:bg-red-500 hover:text-white transition-colors"
        >
          取消预订
        </button>
      </div>
    </div>
  );
}

export default BookingDetail;