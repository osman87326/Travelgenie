import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Compass, MapPin, Star, Calendar, Clock, DollarSign, Award, ChevronRight, User, AlertCircle, Sparkles } from 'lucide-react';
import { mockApi, type Destination, type Review } from '@/services/mockApi';
import { SkeletonLoader } from '@/components/SkeletonLoader';

export const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dest, setDest] = useState<Destination | undefined>(undefined);
  const [related, setRelated] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      if (id) {
        const item = mockApi.getDestinationById(id);
        setDest(item);

        if (item) {
          // Fetch related items (same category, excluding current)
          const all = mockApi.getDestinations();
          const filtered = all
            .filter(d => d.category === item.category && d.id !== item.id)
            .slice(0, 4);
          setRelated(filtered);
        }
      }
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [id]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim()) {
      setReviewError('Name is required');
      return;
    }
    if (reviewComment.trim().length < 5) {
      setReviewError('Review comment must be at least 5 characters');
      return;
    }

    setReviewError('');
    if (dest) {
      const newReview: Review = {
        userName: reviewName,
        rating: reviewRating,
        comment: reviewComment,
        createdAt: new Date().toISOString()
      };
      
      const updatedDest = mockApi.addReview(dest.id, newReview);
      if (updatedDest) {
        setDest(updatedDest);
        setReviewName('');
        setReviewComment('');
        setReviewRating(5);
        setReviewSuccess(true);
        setTimeout(() => setReviewSuccess(false), 3000);
      }
    }
  };

  if (loading) {
    return <SkeletonLoader type="details" />;
  }

  if (!dest) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <Compass className="w-12 h-12 text-rose-500 mx-auto animate-pulse" />
        <h2 className="text-xl font-bold text-white">Destination Not Found</h2>
        <p className="text-sm text-slate-405 leading-relaxed">
          The requested travel location does not exist in our database or has been deleted.
        </p>
        <Link
          to="/explore"
          className="inline-block px-5 py-2.5 bg-teal-650 text-white text-xs font-semibold rounded-xl hover:bg-teal-600 transition-colors"
        >
          Return to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-300 font-semibold truncate max-w-[200px]">{dest.title}</span>
      </nav>

      {/* Hero Header Section */}
      <section className="relative h-[380px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80">
        <img
          src={dest.imageUrl}
          alt={dest.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <div className="inline-block px-2.5 py-1 bg-teal-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
            {dest.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {dest.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-400" />
              {dest.location}, {dest.country}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              {dest.rating} ({dest.reviews.length} reviews)
            </span>
          </div>
        </div>
      </section>

      {/* Main Specs & Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns (Description & Specifications) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Overview */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white">Overview & Highlights</h2>
            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
              {dest.fullDescription}
            </p>
          </div>

          {/* 2. Specs / Tabular Information */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white">Travel Specifications</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/50 p-4 border border-slate-900 rounded-xl space-y-1">
                <Calendar className="w-5 h-5 text-teal-400" />
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Best Season</p>
                <p className="text-xs font-bold text-white truncate" title={dest.bestSeason}>{dest.bestSeason}</p>
              </div>

              <div className="bg-slate-950/50 p-4 border border-slate-900 rounded-xl space-y-1">
                <Clock className="w-5 h-5 text-indigo-400" />
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Duration</p>
                <p className="text-xs font-bold text-white">{dest.duration} Days</p>
              </div>

              <div className="bg-slate-950/50 p-4 border border-slate-900 rounded-xl space-y-1">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Avg Cost</p>
                <p className="text-xs font-bold text-white">${dest.averageCost}</p>
              </div>

              <div className="bg-slate-950/50 p-4 border border-slate-900 rounded-xl space-y-1">
                <Award className="w-5 h-5 text-purple-400" />
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Price Class</p>
                <p className="text-xs font-bold text-white">{dest.priceLevel}</p>
              </div>
            </div>
          </div>

          {/* 3. User Reviews List */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white">Community Reviews ({dest.reviews.length})</h2>
            
            {dest.reviews.length === 0 ? (
              <p className="text-slate-500 text-xs py-2 italic">Be the first to review this destination!</p>
            ) : (
              <div className="divide-y divide-slate-800/60 space-y-4">
                {dest.reviews.map((rev, idx) => (
                  <div key={idx} className="pt-4 first:pt-0 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                          <User className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-xs">{rev.userName}</p>
                          <p className="text-[10px] text-slate-500">{new Date(rev.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, rIdx) => (
                          <Star
                            key={rIdx}
                            className={`w-3.5 h-3.5 ${
                              rIdx < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-800'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-450 text-xs leading-relaxed pl-10">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Sidebar (Review Form & Planning prompt CTA) */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Review Submit Form */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Leave a Review</h3>
            
            {reviewSuccess && (
              <p className="text-xs text-emerald-400 font-semibold animate-pulse">
                Review submitted successfully!
              </p>
            )}

            <form onSubmit={handleAddReview} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${reviewRating >= star ? 'fill-amber-500' : 'text-slate-700'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Your Comments
                </label>
                <textarea
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your thoughts about this place..."
                  className="w-full glass-input text-xs resize-none"
                />
              </div>

              {reviewError && (
                <p className="text-rose-400 text-[10px] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {reviewError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-teal-650 hover:bg-teal-650/90 text-white font-semibold text-xs active:scale-98 transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Quick AI Planner CTA */}
          <div className="glass-panel rounded-2xl p-6 bg-gradient-to-br from-indigo-950/20 to-slate-900/40 border-indigo-500/20 text-center space-y-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-white text-sm">Generate Itinerary</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Unlock instant day-by-day scheduling for {dest.location} customized to your budget.
              </p>
            </div>
            <Link
              to="/dashboard"
              state={{ targetDestination: dest.location }}
              className="block w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs active:scale-98 transition-all shadow-md shadow-indigo-500/10"
            >
              Plan Trip Now
            </Link>
          </div>

        </div>

      </div>

      {/* Related Items Section */}
      {related.length > 0 && (
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Related Destinations</h2>
            <p className="text-slate-400 text-xs">Other scenic locations in the {dest.category} category.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(item => (
              <div
                key={item.id}
                className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden h-[410px] flex flex-col justify-between hover:border-teal-500/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="h-44 w-full relative overflow-hidden bg-slate-850 shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-950/75 backdrop-blur-md rounded-lg border border-slate-800 text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin className="w-3 h-3 text-teal-500" />
                      <span>{item.location}, {item.country}</span>
                    </div>

                    <h3 className="font-bold text-white text-base leading-snug line-clamp-1 group-hover:text-teal-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-450 text-xs leading-relaxed line-clamp-2">
                      {item.shortDescription}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-sans">Avg Cost</p>
                      <p className="text-sm font-bold text-white">${item.averageCost}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-bold text-slate-200">{item.rating}</span>
                    </div>

                    <Link
                      to={`/details/${item.id}`}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-800 hover:border-teal-500/35 hover:bg-teal-500/5 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
