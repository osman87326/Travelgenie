"use client";
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var mockApi_1 = require("@/services/mockApi");
var SkeletonLoader_1 = require("@/components/SkeletonLoader");
function ExplorePage() {
    var _a = react_1.useState([]), destinations = _a[0], setDestinations = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(''), search = _c[0], setSearch = _c[1];
    var _d = react_1.useState('All'), selectedCategory = _d[0], setSelectedCategory = _d[1];
    var _e = react_1.useState('All'), selectedPriceLevel = _e[0], setSelectedPriceLevel = _e[1];
    var _f = react_1.useState('rating'), sortBy = _f[0], setSortBy = _f[1];
    var _g = react_1.useState(1), currentPage = _g[0], setCurrentPage = _g[1];
    var itemsPerPage = 4;
    react_1.useEffect(function () {
        var timer = setTimeout(function () {
            setDestinations(mockApi_1.mockApi.getDestinations());
            setLoading(false);
        }, 800);
        return function () { return clearTimeout(timer); };
    }, []);
    var filtered = destinations.filter(function (dest) {
        var matchesSearch = dest.title.toLowerCase().includes(search.toLowerCase()) ||
            dest.location.toLowerCase().includes(search.toLowerCase()) ||
            dest.country.toLowerCase().includes(search.toLowerCase());
        var matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
        var matchesPrice = selectedPriceLevel === 'All' || dest.priceLevel === selectedPriceLevel;
        return matchesSearch && matchesCategory && matchesPrice;
    });
    var sorted = __spreadArrays(filtered).sort(function (a, b) {
        if (sortBy === 'rating')
            return b.rating - a.rating;
        if (sortBy === 'price-asc')
            return a.averageCost - b.averageCost;
        if (sortBy === 'price-desc')
            return b.averageCost - a.averageCost;
        return 0;
    });
    var totalPages = Math.max(1, Math.ceil(sorted.length / itemsPerPage));
    var startIndex = (currentPage - 1) * itemsPerPage;
    var paginatedItems = sorted.slice(startIndex, startIndex + itemsPerPage);
    react_1.useEffect(function () {
        setCurrentPage(1);
    }, [search, selectedCategory, selectedPriceLevel, sortBy]);
    var categories = ['All', 'Beach', 'Adventure', 'Culture', 'City', 'Nature'];
    var priceLevels = ['All', 'Budget', 'Moderate', 'Luxury'];
    return (React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" },
        React.createElement("div", { className: "space-y-2" },
            React.createElement("h1", { className: "text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-2" },
                React.createElement(lucide_react_1.Compass, { className: "w-8 h-8 text-teal-400" }),
                "Explore Destinations"),
            React.createElement("p", { className: "text-slate-400 text-sm" }, "Browse through our premium database of curated locations and plan your custom AI itineraries.")),
        React.createElement("div", { className: "glass-panel rounded-2xl p-6 space-y-4" },
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4" },
                React.createElement("div", { className: "relative md:col-span-2" },
                    React.createElement(lucide_react_1.Search, { className: "absolute left-3.5 top-3 w-4 h-4 text-slate-500" }),
                    React.createElement("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "Search by city, country, or keyword...", className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm" })),
                React.createElement("div", { className: "md:col-span-2 flex items-center gap-2.5" },
                    React.createElement("span", { className: "text-xs font-semibold text-slate-450 uppercase tracking-wider shrink-0" }, "Sort By"),
                    React.createElement("select", { value: sortBy, onChange: function (e) { return setSortBy(e.target.value); }, className: "w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-teal-500 text-sm" },
                        React.createElement("option", { value: "rating" }, "Highest Rated"),
                        React.createElement("option", { value: "price-asc" }, "Price: Low to High"),
                        React.createElement("option", { value: "price-desc" }, "Price: High to Low")))),
            React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/60" },
                React.createElement("div", { className: "flex items-center gap-2 flex-wrap" },
                    React.createElement("span", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider pr-1" }, "Category"),
                    categories.map(function (cat) { return (React.createElement("button", { key: cat, onClick: function () { return setSelectedCategory(cat); }, className: "px-3 py-1.5 rounded-lg text-xs font-medium transition-all " + (selectedCategory === cat
                            ? 'bg-teal-600/25 border border-teal-500/40 text-teal-400 font-bold'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850') }, cat)); })),
                React.createElement("div", { className: "flex items-center gap-2" },
                    React.createElement("span", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider pr-1" }, "Budget"),
                    priceLevels.map(function (lvl) { return (React.createElement("button", { key: lvl, onClick: function () { return setSelectedPriceLevel(lvl); }, className: "px-3 py-1.5 rounded-lg text-xs font-medium transition-all " + (selectedPriceLevel === lvl
                            ? 'bg-indigo-650/25 border border-indigo-500/40 text-indigo-400 font-bold'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850') }, lvl)); })))),
        loading ? (React.createElement(SkeletonLoader_1.SkeletonLoader, { type: "card", count: 4 })) : paginatedItems.length === 0 ? (React.createElement("div", { className: "text-center py-20 border border-slate-850 rounded-2xl bg-slate-900/10 space-y-3" },
            React.createElement("p", { className: "text-slate-400 font-medium text-lg" }, "No matching destinations found"),
            React.createElement("p", { className: "text-slate-500 text-xs max-w-xs mx-auto" }, "Try adjusting your search query, selecting different categories, or relaxing your budget constraints."))) : (React.createElement("div", { className: "space-y-10" },
            React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" }, paginatedItems.map(function (dest) { return (React.createElement("div", { key: dest.id, className: "bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden h-[410px] flex flex-col justify-between hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/5 hover:-translate-y-1 transition-all duration-300 group" },
                React.createElement("div", { className: "h-44 w-full relative overflow-hidden bg-slate-800 shrink-0" },
                    React.createElement("img", { src: dest.imageUrl, alt: dest.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }),
                    React.createElement("div", { className: "absolute top-3 right-3 px-2.5 py-1 bg-slate-950/75 backdrop-blur-md rounded-lg border border-slate-800 text-[11px] font-bold text-teal-400 uppercase tracking-wider" }, dest.category)),
                React.createElement("div", { className: "p-5 flex-1 flex flex-col justify-between" },
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("div", { className: "flex items-center gap-1 text-[11px] text-slate-400" },
                            React.createElement(lucide_react_1.MapPin, { className: "w-3 h-3 text-teal-500" }),
                            React.createElement("span", null,
                                dest.location,
                                ", ",
                                dest.country)),
                        React.createElement("h3", { className: "font-bold text-white text-base leading-snug line-clamp-1 group-hover:text-teal-400 transition-colors" }, dest.title),
                        React.createElement("p", { className: "text-slate-400 text-xs leading-relaxed line-clamp-2" }, dest.shortDescription)),
                    React.createElement("div", { className: "pt-4 border-t border-slate-800/80 flex items-center justify-between" },
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-[10px] text-slate-500 uppercase tracking-wider font-semibold" }, "Avg Cost"),
                            React.createElement("p", { className: "text-sm font-bold text-white" },
                                "$",
                                dest.averageCost)),
                        React.createElement("div", { className: "flex items-center gap-1" },
                            React.createElement(lucide_react_1.Star, { className: "w-3.5 h-3.5 fill-amber-500 text-amber-500" }),
                            React.createElement("span", { className: "text-xs font-bold text-slate-200" }, dest.rating)),
                        React.createElement(link_1["default"], { href: "/details/" + dest.id, className: "px-3.5 py-1.5 rounded-lg border border-slate-800 hover:border-teal-500/35 hover:bg-teal-500/5 text-xs font-semibold text-slate-300 hover:text-white transition-all" }, "View Details"))))); })),
            totalPages > 1 && (React.createElement("div", { className: "flex items-center justify-center gap-3 pt-4" },
                React.createElement("button", { disabled: currentPage === 1, onClick: function () { return setCurrentPage(function (p) { return Math.max(1, p - 1); }); }, className: "p-2 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-900/50 transition-colors" },
                    React.createElement(lucide_react_1.ChevronLeft, { className: "w-5 h-5" })),
                React.createElement("span", { className: "text-sm font-semibold text-slate-400" },
                    "Page ",
                    currentPage,
                    " of ",
                    totalPages),
                React.createElement("button", { disabled: currentPage === totalPages, onClick: function () { return setCurrentPage(function (p) { return Math.min(totalPages, p + 1); }); }, className: "p-2 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-900/50 transition-colors" },
                    React.createElement(lucide_react_1.ChevronRight, { className: "w-5 h-5" }))))))));
}
exports["default"] = ExplorePage;
