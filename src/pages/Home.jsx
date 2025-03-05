import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  // const [activeCategory, setActiveCategory] = useState('全部');

  // const categories = ['全部', '中餐', '西餐', '日料', '韩餐', '其他'];
  
  const restaurants = [
    {
      id: 1,
      name: 'Table A Deli',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      category: '法餐',
      distance: '0.8km',
      price: 718,
      deposit: 200,
      features: ['免费WiFi', '提供停车', '可带宠物']
    },
    {
      id: 2,
      name: 'Bake No Title',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
      category: '西餐',
      distance: '1.2km',
      price: 368,
      deposit: 100,
      features: ['免费WiFi', '支持预订', '无烟区']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-base mb-2">BNT · Book</h2>
        <p className="text-dark-gray text-lg">探索城市里的美味故事</p>
      </div>



      {/* Categories */}
      {/* <div className="flex gap-3 overflow-x-auto py-2 -mx-4 px-4 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeCategory === category ? 'bg-primary text-white' : 'bg-light-gray text-dark-gray'}`}
          >
            {category}
          </button>
        ))}
      </div> */}

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
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>

            {/* Restaurant Details */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-text-base tracking-tight">{restaurant.name}</h3>
              
              <div className="flex justify-between text-sm text-dark-gray">
                <span>{restaurant.category}</span>
                <span>{restaurant.distance}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-special font-semibold">¥{restaurant.price}/位</div>
                <div className="text-sm text-dark-gray">订金 ¥{restaurant.deposit}/位</div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {restaurant.features.map((feature, index) => {
                  let icon = 'tag';
                  if (feature.includes('WiFi')) icon = 'wifi';
                  if (feature.includes('停车')) icon = 'parking';
                  if (feature.includes('宠物')) icon = 'paw';
                  if (feature.includes('预订')) icon = 'calendar-check';
                  if (feature.includes('无烟')) icon = 'smoking-ban';
                  
                  return (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-light-gray rounded-md text-xs text-dark-gray"
                    >
                      <i className={`fas fa-${icon}`}></i>
                      {feature}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;