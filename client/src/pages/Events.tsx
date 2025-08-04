import { useState } from 'react';
import { Search, MapPin, Calendar, ChevronDown, Filter, Clock, Star, Tag, Users, Heart, Bookmark } from 'lucide-react';
import { useLocation } from 'wouter';

const Events = () => {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  
  const events = [
    {
      id: 1,
      title: 'Tokyo Sakura Festival',
      location: 'Tokyo, Japan',
      date: 'March 25-April 10, 2026',
      time: '10:00 AM - 9:00 PM',
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=2026&auto=format&fit=crop',
      rating: 4.9,
      reviews: 1243,
      price: 'Free',
      category: 'festival',
      tags: ['Culture', 'Spring', 'Nature'],
      description: 'Experience the breathtaking beauty of cherry blossoms throughout Tokyo. Join guided tours, traditional performances, and food stalls in major parks.',
      attendance: '1.5M+ attendees'
    },
    {
      id: 2,
      name: 'Barcelona Wine & Food Festival',
      location: 'Barcelona, Spain',
      date: 'May 15-19, 2026',
      time: '12:00 PM - 10:00 PM',
      image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?q=80&w=2074&auto=format&fit=crop',
      rating: 4.8,
      reviews: 782,
      price: '€45',
      category: 'food',
      tags: ['Culinary', 'Wine', 'Tasting'],
      description: 'A celebration of Spanish cuisine featuring top chefs, wine tastings, cooking demonstrations, and gourmet food from across the country.',
      attendance: '50,000+ attendees'
    },
    {
      id: 3,
      name: 'Northern Lights Photography Tour',
      location: 'Tromsø, Norway',
      date: 'January 10-15, 2026',
      time: '7:00 PM - 1:00 AM',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop',
      rating: 4.9,
      reviews: 456,
      price: '$299',
      category: 'tour',
      tags: ['Photography', 'Nature', 'Winter'],
      description: 'Guided tours to the best locations for viewing and photographing the magnificent Aurora Borealis with expert photographers.',
      attendance: 'Small groups of 12'
    },
    {
      id: 4,
      name: 'Rio Carnival',
      location: 'Rio de Janeiro, Brazil',
      date: 'February 13-18, 2026',
      time: 'All day events',
      image: 'https://images.unsplash.com/photo-1518434109740-21432b25df0d?q=80&w=2070&auto=format&fit=crop',
      rating: 4.7,
      reviews: 2156,
      price: 'Varies',
      category: 'festival',
      tags: ['Dance', 'Music', 'Parade'],
      description: 'The world\'s largest carnival celebration featuring spectacular parades, samba dancing, music, and vibrant costumes.',
      attendance: '2M+ attendees'
    },
    {
      id: 5,
      name: 'Temple and Street Food Night Tour',
      location: 'Bangkok, Thailand',
      date: 'Year-round',
      time: '6:00 PM - 10:00 PM',
      image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=2070&auto=format&fit=crop',
      rating: 4.6,
      reviews: 895,
      price: '$75',
      category: 'food',
      tags: ['Street Food', 'Culture', 'Night Tour'],
      description: 'Experience Bangkok\'s vibrant night culture with visits to illuminated temples and sampling authentic street food from local vendors.',
      attendance: 'Groups of 10-15'
    },
    {
      id: 6,
      name: 'Great Barrier Reef Diving Experience',
      location: 'Cairns, Australia',
      date: 'Year-round',
      time: '8:00 AM - 5:00 PM',
      image: 'https://images.unsplash.com/photo-1682687982093-4d34ccc77377?q=80&w=2071&auto=format&fit=crop',
      rating: 4.8,
      reviews: 1203,
      price: '$195',
      category: 'adventure',
      tags: ['Diving', 'Marine Life', 'Coral Reef'],
      description: 'Guided diving tours of the magnificent Great Barrier Reef with certified instructors, suitable for beginners and experienced divers.',
      attendance: 'Daily tours of 30-50'
    }
  ];
  
  const categories = [
    { value: 'all', label: 'All Events', count: events.length },
    { value: 'festival', label: 'Festivals', count: events.filter(e => e.category === 'festival').length },
    { value: 'food', label: 'Food & Drink', count: events.filter(e => e.category === 'food').length },
    { value: 'tour', label: 'Tours', count: events.filter(e => e.category === 'tour').length },
    { value: 'adventure', label: 'Adventure', count: events.filter(e => e.category === 'adventure').length }
  ];
  
  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(event => event.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Search Section */}
      <div className="relative bg-gradient-to-r from-violet-800 to-purple-700 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-violet-900/60 mix-blend-multiply"></div>
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" 
            alt="Events background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Events Worldwide
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Find unique experiences and events to enhance your travel adventures
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-5 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary">
                  <Search className="w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search for events, festivals, tours..." 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Where?" 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="When?" 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                  />
                </div>
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition whitespace-nowrap">
                Search Events
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2 no-scrollbar">
            {categories.map(category => (
              <button
                key={category.value}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 transition
                  ${activeCategory === category.value 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={() => setActiveCategory(category.value)}
              >
                {category.label}
                <span className={`text-xs py-0.5 px-2 rounded-full ${
                  activeCategory === category.value 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {activeCategory === 'all' ? 'All Events' : `${categories.find(c => c.value === activeCategory)?.label}`}
            </h2>
            <p className="text-gray-600">
              {filteredEvents.length} events to discover for your next adventure
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:shadow-md transition">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:shadow-md transition">
              <span className="text-sm font-medium">Sort by: Popular</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.name || event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="w-8 h-8 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition">
                    <Heart className="w-4 h-4 text-gray-500 hover:text-rose-500" />
                  </button>
                  <button className="w-8 h-8 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition">
                    <Bookmark className="w-4 h-4 text-gray-500 hover:text-primary" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-600">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{event.name || event.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{event.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <div className="text-lg font-bold text-primary">{event.price}</div>
                    {event.time && (
                      <div className="flex items-center ml-4 text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{event.time}</span>
                      </div>
                    )}
                  </div>
                  <button 
                    className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary/90 text-sm transition"
                    onClick={() => setLocation('/')}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-white text-primary font-medium py-3 px-8 rounded-full border border-primary hover:bg-primary/5 transition">
            Load More Events
          </button>
        </div>
      </div>
      
      {/* Featured Experiences */}
      <div className="bg-gradient-to-r from-violet-900 to-purple-800 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 text-white">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Get AI-Powered Event Recommendations</h2>
              <p className="text-lg text-purple-200 mb-6">
                Our AI assistant can curate personalized event recommendations based on your travel dates, interests, and preferences. Whether you're looking for cultural festivals, food tours, or unique adventures, let our AI find the perfect events for your trip.
              </p>
              <button 
                className="bg-white text-purple-700 font-bold py-3 px-8 rounded-full hover:bg-purple-50 transition shadow-lg"
                onClick={() => setLocation('/')}
              >
                Get Personalized Recommendations
              </button>
            </div>
            <div className="md:w-1/2 bg-purple-800/50 backdrop-blur-sm p-6 rounded-xl">
              <div className="text-xl font-bold mb-4">Popular Event Categories</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-700/50 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 11l18-5v12L3 14v-3z"></path>
                        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                      </svg>
                    </div>
                    <span>Cultural Festivals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-700/50 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 10c-1.1 0-2-.9-2-2V4H2v16h20V10H12z"></path>
                        <path d="M10 4l4 6h6"></path>
                        <path d="M15.5 15h.5"></path>
                        <path d="M8 15h.5"></path>
                        <path d="M11.5 15h.5"></path>
                      </svg>
                    </div>
                    <span>Food & Wine Tours</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-700/50 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 6v6l4 2"></path>
                      </svg>
                    </div>
                    <span>Historical Tours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-700/50 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                      </svg>
                    </div>
                    <span>Adventure Activities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;