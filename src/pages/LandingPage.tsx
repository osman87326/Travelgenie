import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, MapPin, Star, Shield, Zap, Heart, MessageSquare, Plus, Minus, ArrowRight, Activity, Users, Globe, Trophy } from 'lucide-react';
import { mockApi, Destination } from '../services/mockApi';

export const LandingPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // Simulate brief loading for skeleton
    const timer = setTimeout(() => {
      setDestinations(mockApi.getDestinations().slice(0, 4));
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', 'Beach', 'Adventure', 'Culture', 'City', 'Nature'];

  const filteredDestinations = activeCategory === 'All'
    ? destinations
    : destinations.filter(d => d.category === activeCategory);

  const faqs = [
    {
      q: "How does the AI planning engine work?",
      a: "Our engine combines Google Gemini LLMs with customized context mapping. By parsing your trip destination, budget, travel style, and interests, it drafts a structured, highly specific daily schedule, which can be modified in real-time by chatting with our AI assistant."
    },
    {
      q: "Can I customize the generated itineraries?",
      a: "Absolutely! Every trip generated comes with an interactive AI Chat Assistant. You can ask it to 'reduce Day 2 activities', 'swap dinner for a budget option', or 'add outdoor activities' and it will instantly recalculate costs and save a new version."
    },
    {
      q: "What is Plan Evolution versioning?",
      a: "Plan Evolution tracks the modifications made to your trip. Whenever you or the AI modifies the plan, a new version is created. You can toggle between versions in a visual timeline to compare activities and budget changes."
    },
    {
      q: "Is there a limit to how many destinations I can add?",
      a: "No! As a member, you can list custom destinations, write reviews, and generate unlimited itineraries for any destination in the world."
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section (60-70% height) */}
      <section className="relative h-[65vh] min-h-[480px] max-h-[620px] flex items-center justify-center overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-indigo-500/5 to-slate-950" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-400 text-xs font-semibold tracking-wider uppercase animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen Agentic Travel Assistant
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none">
            Your Next Adventure, <br className="hidden sm:inline"/>
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
              Engineered by AI
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Generate custom, budget-optimized itineraries with a single click. Refine your plans interactively using context-aware AI agents.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              Explore Destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Plan a Trip
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">State-of-the-Art Features</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Everything you need for smart, seamless, and budget-optimized itinerary planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Instant AI Generation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Input your destination, budget, duration, and preferences to receive a complete, detailed plan in seconds.
            </p>
          </div>

          <div className="glass-card p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Chat Assistant</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Refine your plans using natural speech. Tell TravelGenie to swap hotels or trim prices, and watch it rebuild the schedule.
            </p>
          </div>

          <div className="glass-card p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Plan Evolution</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Keep track of version history. Review what was added, removed, or edited with visual comparisons between plans.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Categories Tab Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">Browse by Category</h2>
            <p className="text-slate-400 text-sm">Select a category to view handpicked, premium travel spots.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Popular Destinations Card Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 -mt-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-850 rounded-2xl h-[390px] animate-pulse" />
            ))}
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center py-12 border border-slate-800/80 rounded-2xl bg-slate-900/20">
            <p className="text-slate-500 text-sm">No destinations found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map(dest => (
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

                {/* Info Content */}
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
        )}
      </section>

      {/* 5. How It Works Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">How It Works</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Design your ideal vacation in three simple stages guided by our artificial intelligence agent.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line connecting steps on large screen */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800/60 -translate-x-1/2" />
          
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Step 1</span>
                <h3 className="text-xl font-bold text-white mt-1">Specify Preferences</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-sm md:ml-auto leading-relaxed">
                  Enter your destination, duration, budget, traveler count, and interests. Custom tags help target specific activities.
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center z-10 shrink-0 font-bold text-white">
                1
              </div>
              <div className="md:w-1/2 md:pl-12 hidden md:block" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
              <div className="md:w-1/2 md:pr-12 hidden md:block" />
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center z-10 shrink-0 font-bold text-white">
                2
              </div>
              <div className="md:w-1/2 md:pl-12">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 2</span>
                <h3 className="text-xl font-bold text-white mt-1">Generate & Review Itinerary</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-sm leading-relaxed">
                  Our LLM parsing engine designs day-by-day scheduled activities, pricing, and locations. A cost breakdown chart helps you visualize the budget.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Step 3</span>
                <h3 className="text-xl font-bold text-white mt-1">Co-Plan via AI Chat</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-sm md:ml-auto leading-relaxed">
                  Chat with our smart AI travel agent to request adjustments. Watch it dynamically rebuild your plan and review the timeline comparison.
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center z-10 shrink-0 font-bold text-white">
                3
              </div>
              <div className="md:w-1/2 md:pl-12 hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Statistics Section */}
      <section className="bg-slate-900/30 border-y border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="flex justify-center text-teal-400 mb-1">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-white">120+</h3>
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Countries Covered</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-center text-indigo-400 mb-1">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-white">15K+</h3>
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Active Travelers</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-center text-emerald-400 mb-1">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-white">50K+</h3>
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">AI Plans Generated</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-center text-rose-400 mb-1">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-white">4.9</h3>
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">App Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">What Travelers Say</h2>
          <p className="text-slate-400 text-sm">Real reviews from our community of global adventurers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=Michael"
                alt="Michael"
                className="w-10 h-10 rounded-full bg-slate-800"
              />
              <div>
                <h4 className="font-bold text-white text-sm">Michael Thorne</h4>
                <p className="text-xs text-slate-500">Solo Backpacker</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed italic">
              "The ability to edit my itinerary via chat is a game changer. I asked the assistant to shift my itinerary in Kyoto to cheaper sights, and it updated my budget spreadsheet immediately!"
            </p>
          </div>

          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=Emma"
                alt="Emma"
                className="w-10 h-10 rounded-full bg-slate-800"
              />
              <div>
                <h4 className="font-bold text-white text-sm">Emma Watson</h4>
                <p className="text-xs text-slate-500">Family Traveler</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed italic">
              "Planning trips for a family of four is stressful, but the AI recommendation matched our exact interests (Nature + Kid-friendly parks). The visual Recharts graphs kept us completely on budget."
            </p>
          </div>

          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=Daniel"
                alt="Daniel"
                className="w-10 h-10 rounded-full bg-slate-800"
              />
              <div>
                <h4 className="font-bold text-white text-sm">Daniel K.</h4>
                <p className="text-xs text-slate-500">Digital Nomad</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed italic">
              "Clean UI, zero fluff, and extremely functional. It has everything—Explore catalog, CRUD item adding, and robust AI integrations. Essential for my travel toolkit."
            </p>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-850 rounded-xl overflow-hidden bg-slate-900/20"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-white font-medium hover:bg-slate-900/40 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <Minus className="w-5 h-5 text-teal-400 shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              
              {openFaq === idx && (
                <div className="p-5 pt-0 text-sm text-slate-400 border-t border-slate-900 bg-slate-950/20 leading-relaxed animate-in fade-in duration-350">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-900/60 to-indigo-900/60 border border-teal-500/20 p-8 sm:p-12 text-center space-y-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to design your dream journey?
          </h2>
          <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
            Create an account today to generate custom itineraries, save your trip history, and coordinate with TravelGenie.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold active:scale-95 transition-all"
            >
              Sign Up Now
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
