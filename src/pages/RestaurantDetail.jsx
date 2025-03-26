import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import request from '../utils/request';

function RestaurantDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await request(`/api/v1/restaurants/${id}`);
        setRestaurant(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="text-red-500 mb-4">{error || '餐厅信息加载失败'}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          重试
        </button>
      </div>
    );
  }

  // 设置默认的booking_rules
  const bookingRules = restaurant.booking_rules || {
    lunch_duration: 90,
    dinner_duration: 120,
    late_threshold: 15,
    cancellation_policy: '就餐前24小时以上取消，全额退还订金；就餐前12-24小时取消，退还订金的50%；就餐前12小时内取消，订金不予退还。'
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
        {restaurant.images.find(img => img.is_cover) && (
          <img
            src={restaurant.images.find(img => img.is_cover).image_url}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        )}
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
            <span>{restaurant.opening_hours}</span>
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
            <p className="text-dark-gray/80 mt-2">{restaurant.phone}</p>
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
                  <i className={`fas ${feature.icon} text-primary text-xs`}></i>
                  {feature.name}
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
                    <span>午市用餐时间为 {bookingRules.lunch_duration} 分钟</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-circle text-[4px] mt-[8px] text-primary"></i>
                    <span>晚市用餐时间为 {bookingRules.dinner_duration} 分钟</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-circle text-[4px] mt-[8px] text-primary"></i>
                    <span>请按预订时间准时到店，迟到超过 {bookingRules.late_threshold} 分钟将视为主动放弃预订</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium mb-2">取消政策</h3>
                <p className="text-sm text-dark-gray/80">
                  {bookingRules.cancellation_policy}
                </p>
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
