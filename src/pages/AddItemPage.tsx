import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { PlusCircle, AlertCircle, Sparkles, Image, MapPin } from 'lucide-react';

export const AddItemPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    country: '',
    category: 'Nature' as 'Beach' | 'Adventure' | 'Culture' | 'City' | 'Nature',
    shortDescription: '',
    fullDescription: '',
    priceLevel: 'Moderate' as 'Budget' | 'Moderate' | 'Luxury',
    averageCost: 1000,
    bestSeason: '',
    duration: 5,
    imageUrl: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.location.trim()) newErrors.location = 'City/Location is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    } else if (formData.shortDescription.length > 150) {
      newErrors.shortDescription = 'Must be under 150 characters';
    }
    if (!formData.fullDescription.trim()) newErrors.fullDescription = 'Full description is required';
    if (!formData.bestSeason.trim()) newErrors.bestSeason = 'Best season description is required';
    
    if (!formData.averageCost || formData.averageCost <= 0) {
      newErrors.averageCost = 'Cost must be greater than 0';
    }
    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate brief API request delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Assign default fallback image if empty
    const finalImageUrl = formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop';

    mockApi.addDestination({
      ...formData,
      imageUrl: finalImageUrl,
      createdBy: user?.id || 'usr-demo'
    });

    setLoading(false);
    navigate('/items/manage');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <PlusCircle className="w-8 h-8 text-teal-400" />
          Add Custom Destination
        </h1>
        <p className="text-slate-400 text-sm">
          Expand our catalog by adding unique locations. They will become instantly queryable in the planning form.
        </p>
      </div>

      {/* Form Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6 text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Destination Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Kyoto Cherry Blossom Retreat"
                className={`w-full glass-input ${errors.title ? 'border-rose-500/50' : ''}`}
              />
              {errors.title && (
                <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-teal-500"
              >
                <option value="Nature">Nature</option>
                <option value="Beach">Beach</option>
                <option value="Adventure">Adventure</option>
                <option value="Culture">Culture</option>
                <option value="City">City</option>
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* City / Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                City / Region
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Kyoto"
                className={`w-full glass-input ${errors.location ? 'border-rose-500/50' : ''}`}
              />
              {errors.location && (
                <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.location}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Country
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g. Japan"
                className={`w-full glass-input ${errors.country ? 'border-rose-500/50' : ''}`}
              />
              {errors.country && (
                <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.country}
                </p>
              )}
            </div>

          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Short Summary Description
            </label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="e.g. A gorgeous zen retreat set in traditional Kyoto temples. (Max 150 chars)"
              className={`w-full glass-input ${errors.shortDescription ? 'border-rose-500/50' : ''}`}
            />
            {errors.shortDescription && (
              <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.shortDescription}
              </p>
            )}
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Full Destination Overview Description
            </label>
            <textarea
              rows={4}
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Detailed specifications about landmarks, history, local activities..."
              className={`w-full glass-input resize-none ${errors.fullDescription ? 'border-rose-500/50' : ''}`}
            />
            {errors.fullDescription && (
              <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.fullDescription}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            
            {/* Price Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Price Level
              </label>
              <select
                value={formData.priceLevel}
                onChange={(e) => setFormData({ ...formData, priceLevel: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-teal-500"
              >
                <option value="Budget">Budget</option>
                <option value="Moderate">Moderate</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            {/* Average Cost */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Avg Cost (USD)
              </label>
              <input
                type="number"
                value={formData.averageCost}
                onChange={(e) => setFormData({ ...formData, averageCost: parseInt(e.target.value) || 0 })}
                className={`w-full glass-input ${errors.averageCost ? 'border-rose-500/50' : ''}`}
              />
              {errors.averageCost && (
                <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.averageCost}
                </p>
              )}
            </div>

            {/* Best Season */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Best Season
              </label>
              <input
                type="text"
                value={formData.bestSeason}
                onChange={(e) => setFormData({ ...formData, bestSeason: e.target.value })}
                placeholder="e.g. Spring / Oct-Nov"
                className={`w-full glass-input ${errors.bestSeason ? 'border-rose-500/50' : ''}`}
              />
              {errors.bestSeason && (
                <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.bestSeason}
                </p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Ideal Days
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                className={`w-full glass-input ${errors.duration ? 'border-rose-500/50' : ''}`}
              />
              {errors.duration && (
                <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.duration}
                </p>
              )}
            </div>

          </div>

          {/* Optional Image URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Image URL (Optional)
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-mono"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">If left empty, a scenic default placeholder will be assigned.</p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/60">
            <button
              type="button"
              onClick={() => navigate('/items/manage')}
              className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md shadow-teal-500/10"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Add Destination
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
