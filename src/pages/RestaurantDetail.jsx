import { useNavigate, useParams } from 'react-router-dom';

function RestaurantDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 模拟餐厅数据
  const restaurant = {
    id: 1,
    name: 'Table A Deli',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9',
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b'
    ],
    category: '西餐',
    price: 718,
    deposit: 200,
    address: '上海市静安区南京西路829号',
    description: '精致的法式餐厅，提供正宗的法国美食，环境优雅，服务专业。',
    features: ['免费WiFi', '提供停车', '支持预订', '可带宠物'],
    openingHours: '周一至周日 11:30-22:00'
  };

  return (
    <div className="-m-4">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg"
        >
          <i className="fas fa-arrow-left text-text-base"></i>
        </button>
      </div>

      {/* Restaurant Images */}
      <div className="relative h-72 bg-light-gray">
        <img
          src={restaurant.images[0]}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Restaurant Info */}
      <div className="px-6 pt-6 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            {restaurant.name}
          </h1>
          <div className="flex items-center gap-3 text-dark-gray/80 mb-4">
            <span>{restaurant.category}</span>
            <span>•</span>
            <span>{restaurant.openingHours}</span>
          </div>
          <div className="space-y-2">
            <div className="text-price text-2xl font-bold">¥{restaurant.price}/位</div>
            <div className="text-dark-gray/80">订金：¥{restaurant.deposit}/位</div>
          </div>
        </div>

        {/* Restaurant Details */}
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
              <i className="fas fa-info-circle text-primary"></i>
              餐厅简介
            </h2>
            <p className="text-dark-gray/80 leading-relaxed">{restaurant.description}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-primary"></i>
              餐厅地址
            </h2>
            <p className="text-dark-gray/80">{restaurant.address}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
              <i className="fas fa-star text-primary"></i>
              餐厅特色
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {restaurant.features.map((feature, index) => (
                <div
                  key={index}
                  className="text-dark-gray/80 text-sm flex items-center gap-2"
                >
                  <i className="fas fa-check text-primary text-xs"></i>
                  {feature}
                </div>
              ))}
            </div>
          </section>

          {/* 预订须知 */}
          <section>
            <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
              <i className="fas fa-exclamation-circle text-primary"></i>
              预订须知
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium mb-2">用餐时间</h3>
                <ul className="text-sm text-dark-gray/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-circle text-[4px] mt-[8px] text-primary"></i>
                    <span>午市用餐时间为 90 分钟，晚市用餐时间为 120 分钟</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-circle text-[4px] mt-[8px] text-primary"></i>
                    <span>请按预订时间准时到店，迟到超过 15 分钟将视为主动放弃预订</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium mb-2">预订规则</h3>
                <ul className="text-sm text-dark-gray/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-circle text-[4px] mt-[8px] text-primary"></i>
                    <span>每位顾客需支付 {restaurant.deposit} 元订金</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-circle text-[4px] mt-[8px] text-primary"></i>
                    <span>如需修改预订，建议提前 24 小时联系餐厅</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-circle text-[4px] mt-[8px] text-primary"></i>
                    <span>如需取消预订，请查看取消政策</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium mb-2">用餐提醒</h3>
                <ul className="text-sm text-dark-gray/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-circle text-[4px] mt-[8px] text-primary"></i>
                    <span>如有特殊饮食要求，请提前告知</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-circle text-[4px] mt-[8px] text-primary"></i>
                    <span>建议您提前 5-10 分钟到达餐厅</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-circle text-[4px] mt-[8px] text-primary"></i>
                    <span>未成年人请在监护人陪同下用餐</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Booking Button */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray/10 max-w-md mx-auto">
        <button
          onClick={() => navigate(`/booking/${id}`)}
          className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          立即预订
        </button>
      </div>
    </div>
  );
}

export default RestaurantDetail;