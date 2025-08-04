import { useState } from 'react';
import { Search, MapPin, Calendar, Star, Filter, ChevronDown, Home, Building, Wifi, Coffee, Car, Tv, Bath, Users } from 'lucide-react';
import { useLocation } from 'wouter';

const Hotels = () => {
  const [, setLocation] = useLocation();
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  
  const hotels = [
    {
      id: 1,
      name: 'The Grand Plaza Hotel',
      location: 'Tokyo, Japan',
      price: 350,
      rating: 4.9,
      reviews: 1243,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
      description: 'Luxury hotel with breathtaking views of Tokyo skyline, featuring a rooftop pool and award-winning restaurants.',
      amenities: ['Swimming Pool', 'Spa', 'Fine Dining', 'Fitness Center', 'Free WiFi']
    },
    {
      id: 2,
      name: 'Seaside Resort & Spa',
      location: 'Bali, Indonesia',
      price: 280,
      rating: 4.8,
      reviews: 987,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
      description: 'Beachfront villas with private pools and direct beach access, surrounded by tropical gardens.',
      amenities: ['Private Beach', 'Spa', 'Water Sports', 'Multiple Pools', 'Butler Service']
    },
    {
      id: 3,
      name: 'Alpine Lodge',
      location: 'Zurich, Switzerland',
      price: 420,
      rating: 4.9,
      reviews: 756,
      image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=2070&auto=format&fit=crop',
      description: 'Charming mountain retreat with stunning Alpine views, traditional Swiss cuisine, and premium ski-in/ski-out access.',
      amenities: ['Ski Access', 'Sauna', 'Fireplace', 'Restaurant', 'Mountain Views']
    },
    {
      id: 4,
      name: 'Urban Boutique Hotel',
      location: 'Paris, France',
      price: 310,
      rating: 4.7,
      reviews: 1127,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop',
      description: 'Stylish boutique hotel in central Paris, within walking distance to major attractions and shopping districts.',
      amenities: ['Rooftop Bar', 'Concierge', 'Room Service', 'Designer Interiors', 'City Tours']
    },
    {
      id: 5,
      name: 'Beachfront Paradise',
      location: 'Cancun, Mexico',
      price: 250,
      rating: 4.6,
      reviews: 1432,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
      description: 'All-inclusive beachfront resort with multiple restaurants, water sports, and entertainment options for all ages.',
      amenities: ['All-Inclusive', 'Water Sports', 'Multiple Restaurants', 'Entertainment', 'Kids Club']
    },
    {
      id: 6,
      name: 'Historic City Inn',
      location: 'Prague, Czech Republic',
      price: 180,
      rating: 4.5,
      reviews: 863,
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop',
      description: 'Charming hotel set in a restored medieval building in the heart of Prague\'s historic district.',
      amenities: ['Historic Building', 'Breakfast Included', 'Walking Tours', 'Airport Shuttle', 'Bar']
    }
  ];
  
  const propertyTypes = [
    { icon: <Home className="w-5 h-5" />, label: 'Hotels', count: 2450 },
    { icon: <Building className="w-5 h-5" />, label: 'Apartments', count: 1873 },
    { icon: <Home className="w-5 h-5" />, label: 'Resorts', count: 652 },
    { icon: <Home className="w-5 h-5" />, label: 'Villas', count: 423 },
    { icon: <Home className="w-5 h-5" />, label: 'Hostels', count: 378 }
  ];
  
  const amenities = [
    { icon: <Wifi className="w-5 h-5" />, label: 'Free WiFi', count: 4123 },
    { icon: <Coffee className="w-5 h-5" />, label: 'Breakfast', count: 3298 },
    { icon: <Car className="w-5 h-5" />, label: 'Parking', count: 2784 },
    { icon: <Tv className="w-5 h-5" />, label: 'TV', count: 4521 },
    { icon: <Bath className="w-5 h-5" />, label: 'Pool', count: 1652 },
    { icon: <Users className="w-5 h-5" />, label: 'Family Rooms', count: 2341 }
  ];
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-amber-400 text-amber-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-200" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-200" />);
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Search Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" 
            alt="Hotel background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Find and Book Perfect Hotels
            </h1>
            <p className="text-lg text-blue-100">
              Discover comfortable stays with our AI-powered hotel recommendations
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Where are you going?" 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Check-in — Check-out" 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary">
                  <Users className="w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="2 adults, 0 children" 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition">
                Search Hotels
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar/Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Price Range</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="bg-gray-100 rounded-lg px-3 py-1">
                    <span className="text-gray-800 font-medium">${priceRange[0]}</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg px-3 py-1">
                    <span className="text-gray-800 font-medium">${priceRange[1]}</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="1000" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Property Type</h3>
              <div className="space-y-3">
                {propertyTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                      {type.icon}
                      <span>{type.label}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{type.count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Guest Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div 
                    key={rating} 
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${selectedRating === rating ? 'bg-primary/10 border border-primary/30' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedRating(rating === selectedRating ? null : rating)}
                  >
                    <div className="flex items-center gap-2">
                      {renderStars(rating)}
                      {rating < 5 && <span className="text-gray-500">&amp; up</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Amenities</h3>
              <div className="space-y-3">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <div className="flex items-center gap-2">
                      {amenity.icon}
                      <span>{amenity.label}</span>
                    </div>
                    <span className="text-gray-500 text-sm ml-auto">{amenity.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                  {hotels.length} Hotels Found
                </span>
              </h2>
              
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <span className="text-gray-600">Sort by:</span>
                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition">
                  <span className="text-sm font-medium">Recommended</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-64 md:h-auto relative">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-amber-500 mb-2">
                        {renderStars(hotel.rating)}
                        <span className="text-sm font-medium ml-2">{hotel.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({hotel.reviews} reviews)</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{hotel.location}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{hotel.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.map((amenity, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-100">
                      <div>
                        <span className="font-bold text-xl text-primary">${hotel.price}</span>
                        <span className="text-gray-500 text-sm"> / night</span>
                      </div>
                      <button className="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary/90 transition mt-3 sm:mt-0">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex justify-center">
              <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                  ...
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                  10
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Recommendation CTA */}
      <div className="bg-gradient-to-r from-primary to-indigo-600 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Get AI-Powered Hotel Recommendations</h2>
              <p className="text-blue-100 mb-6">
                Our AI assistant will find the perfect hotel for your trip based on your preferences, budget, and desired amenities. Try our personalized recommendation engine now!
              </p>
              <button 
                className="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition shadow-lg"
                onClick={() => setLocation('/')}
              >
                Get Personalized Recommendations
              </button>
            </div>
            <div className="md:w-1/3 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 rounded-full p-1 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Tailored recommendations based on your travel style</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 rounded-full p-1 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Find hotels with your must-have amenities</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 rounded-full p-1 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Best value options within your budget range</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for the check icon
const Check = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default Hotels;