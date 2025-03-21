import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, API_ENDPOINTS } from '../config/config';

function Home() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchRestaurants = async (skip = 0) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_URL}${API_ENDPOINTS.restaurants.list}?skip=${skip}&limit=${limit}`);
      const data = await response.json();

      if (data.status_code === 200 && Array.isArray(data.data)) {
        if (skip === 0) {
          setRestaurants(data.data);
        } else {
          setRestaurants(prev => [...prev, ...data.data]);
        }
        setHasMore(data.data.length === limit);
      } else {
        setError('获取餐厅列表失败');
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants(0);
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchRestaurants((nextPage - 1) * limit);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-base mb-2">BNT · Book</h2>
        <p className="text-dark-gray text-lg">探索城市里的美味故事</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Restaurant List */}
      <div className="grid gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            {/* Restaurant Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={restaurant.images?.[0]?.image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={restaurant.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                loading="lazy"
              />
            </div>

            {/* Restaurant Details */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-text-base tracking-tight">{restaurant.name}</h3>
              
              <div className="flex justify-between text-sm text-dark-gray">
                <span>{restaurant.category}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-special font-semibold">¥{restaurant.price}/位</div>
                <div className="text-sm text-dark-gray">订金 ¥{restaurant.deposit}/位</div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {restaurant.features?.map((feature, index) => {
                  let icon = 'tag';
                  if (feature.name.includes('WiFi')) icon = 'wifi';
                  if (feature.name.includes('停车')) icon = 'parking';
                  if (feature.name.includes('宠物')) icon = 'paw';
                  if (feature.name.includes('预订')) icon = 'calendar-check';
                  if (feature.name.includes('无烟')) icon = 'smoking-ban';
                  
                  return (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-light-gray rounded-md text-xs text-dark-gray"
                    >
                      <i className={`fas fa-${icon}`}></i>
                      {feature.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center pt-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className={`px-6 py-2 bg-primary text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
          >
            {loading ? '加载中...' : '加载更多'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;