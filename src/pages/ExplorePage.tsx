import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Compass, MapPin, Star, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { mockApi, Destination } from '../services/mockApi';
import { SkeletonLoader } from '../components/SkeletonLoader';

export const ExplorePage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering and Sorting States
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceLevel, setSelectedPriceLevel] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // rating, price-asc, price-desc
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    // Simulate API Fetch Delay
    const timer = setTimeout(() => {
      setDestinations(mockApi.getDestinations());
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filtered = destinations.filter(dest => {
    const matchesSearch = 
      dest.title.toLowerCase().includes(search.toLowerCase()) ||
      dest.location.toLowerCase().includes(search.toLowerCase()) ||
      dest.country.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    const matchesPrice = selectedPriceLevel === 'All' || dest.priceLevel === selectedPriceLevel;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort Logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.averageCost - b.averageCost;
    if (sortBy === 'price-desc') return b.averageCost - a.averageCost;
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(sorted.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = sorted.slice(startIndex, startIndex + itemsPerPage);

  // Reset page on filter/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedPriceLevel, sortBy]);

  const categories = ['All', 'Beach', 'Adventure', 'Culture', 'City', 'Nature'];
  const priceLevels = ['All', 'Budget', 'Moderate', 'Luxury'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-2">
          <Compass className="w-8 h-8 text-teal-400" />
          Explore Destinations
        </h1>
        <p className="text-slate-400 text-sm">
          Browse through our premium database of curated locations and plan your custom AI itineraries.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by city, country, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
            />
          </div>

          {/* Sort Selection */}
          <div className="md:col-span-2 flex items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-450 uppercase tracking-wider shrink-0">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-teal-500 text-sm"
            >
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Categories & Price Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/60">
          
          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pr-1">Category</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-600/25 border border-teal-500/40 text-teal-400 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Level Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pr-1">Budget</span>
            {priceLevels.map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedPriceLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedPriceLevel === lvl
                    ? 'bg-indigo-650/25 border border-indigo-500/40 text-indigo-400 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Grid Content */}
      {loading ? (
        <SkeletonLoader type="card" count={4} />
      ) : paginatedItems.length === 0 ? (
        <div className="text-center py-20 border border-slate-850 rounded-2xl bg-slate-900/10 space-y-3">
          <p className="text-slate-400 font-medium text-lg">No matching destinations found</p>
          <p className="text-slate-500 text-xs max-w-xs mx-auto">
            Try adjusting your search query, selecting different categories, or relaxing your budget constraints.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedItems.map(dest => (
              <div
                key={dest.id}
                className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden h-[410px] flex flex-col justify-between hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/5 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="h-44 w-full relative overflow-hidden bg-slate-800 shrink-0">
                  <img
                    src={dest.imageUrl}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-950/75 backdrop-blur-md rounded-lg border border-slate-800 text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                    {dest.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin className="w-3 h-3 text-teal-500" />
                      <span>{dest.location}, {dest.country}</span>
                    </div>

                    <h3 className="font-bold text-white text-base leading-snug line-clamp-1 group-hover:text-teal-400 transition-colors">
                      {dest.title}
                    </h3>

                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {dest.shortDescription}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Avg Cost</p>
                      <p className="text-sm font-bold text-white">${dest.averageCost}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-bold text-slate-200">{dest.rating}</span>
                    </div>

                    <Link
                      to={`/details/${dest.id}`}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-800 hover:border-teal-500/35 hover:bg-teal-500/5 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="p-2 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-900/50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-semibold text-slate-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="p-2 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-900/50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
