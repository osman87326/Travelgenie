"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var AuthContext_1 = require("@/context/AuthContext");
var lucide_react_1 = require("lucide-react");
var clsx_1 = require("clsx");
function Navbar() {
    var _a = AuthContext_1.useAuth(), user = _a.user, logout = _a.logout, geminiApiKey = _a.geminiApiKey, setApiKey = _a.setApiKey;
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = react_1.useState(false), showKeyModal = _c[0], setShowKeyModal = _c[1];
    var _d = react_1.useState(geminiApiKey), tempKey = _d[0], setTempKey = _d[1];
    var _e = react_1.useState(false), showProfileDropdown = _e[0], setShowProfileDropdown = _e[1];
    var pathname = navigation_1.usePathname();
    var router = navigation_1.useRouter();
    var handleSaveKey = function (e) {
        e.preventDefault();
        setApiKey(tempKey);
        setShowKeyModal(false);
    };
    var handleLogout = function () {
        logout();
        setShowProfileDropdown(false);
        router.push('/');
    };
    var activeClassName = "text-teal-400 font-semibold flex items-center gap-1.5 py-2 px-3 border-b-2 border-teal-500";
    var inactiveClassName = "text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all duration-200 flex items-center gap-1.5 py-2 px-3 rounded-lg";
    var mobileActiveClassName = 'bg-slate-900 text-teal-400 block px-3 py-2 rounded-md font-medium flex items-center gap-2.5';
    var mobileInactiveClassName = 'text-slate-300 hover:bg-slate-900/60 block px-3 py-2 rounded-md font-medium flex items-center gap-2.5';
    var publicLinks = [
        { to: '/', label: 'Home', icon: React.createElement(lucide_react_1.Sparkles, { className: "w-4 h-4" }) },
        { to: '/explore', label: 'Explore', icon: React.createElement(lucide_react_1.Compass, { className: "w-4 h-4" }) },
        { to: '/about', label: 'About', icon: React.createElement(lucide_react_1.Info, { className: "w-4 h-4" }) },
        { to: '/contact', label: 'Contact', icon: React.createElement(lucide_react_1.Mail, { className: "w-4 h-4" }) },
    ];
    var protectedLinks = [
        { to: '/dashboard', label: 'Dashboard', icon: React.createElement(lucide_react_1.LayoutDashboard, { className: "w-4 h-4" }) },
        { to: '/items/add', label: 'Add Item', icon: React.createElement(lucide_react_1.PlusCircle, { className: "w-4 h-4" }) },
        { to: '/items/manage', label: 'Manage', icon: React.createElement(lucide_react_1.Settings, { className: "w-4 h-4" }) },
    ];
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { className: "sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 transition-all duration-300" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "flex items-center justify-between h-16" },
                    React.createElement("div", { className: "flex-shrink-0 flex items-center" },
                        React.createElement(link_1["default"], { href: "/", className: "flex items-center gap-2.5 group" },
                            React.createElement("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300" },
                                React.createElement(lucide_react_1.Sparkles, { className: "w-5 h-5 text-white" })),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-teal-400 bg-clip-text text-transparent tracking-tight" }, "TravelGenie"),
                                React.createElement("span", { className: "text-[10px] font-bold text-indigo-400 block tracking-widest leading-3 -mt-0.5" }, "AI PLANNER")))),
                    React.createElement("div", { className: "hidden md:flex items-center space-x-1.5" },
                        publicLinks.map(function (link) { return (React.createElement(link_1["default"], { key: link.to, href: link.to, className: clsx_1["default"](pathname === link.to ? activeClassName : inactiveClassName) },
                            link.icon,
                            link.label)); }),
                        user && protectedLinks.map(function (link) { return (React.createElement(link_1["default"], { key: link.to, href: link.to, className: clsx_1["default"](pathname === link.to ? activeClassName : inactiveClassName) },
                            link.icon,
                            link.label)); })),
                    React.createElement("div", { className: "hidden md:flex items-center gap-3" },
                        React.createElement("button", { onClick: function () { setTempKey(geminiApiKey); setShowKeyModal(true); }, className: "p-2 rounded-lg border transition-all duration-200 " + (geminiApiKey
                                ? 'border-teal-500/30 bg-teal-500/5 text-teal-400 hover:bg-teal-500/10'
                                : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800'), title: "Configure Gemini API Key" },
                            React.createElement(lucide_react_1.Key, { className: "w-5 h-5" })),
                        user ? (React.createElement("div", { className: "relative" },
                            React.createElement("button", { onClick: function () { return setShowProfileDropdown(!showProfileDropdown); }, className: "flex items-center gap-2 p-1.5 rounded-full border border-slate-800 bg-slate-900 hover:border-slate-700 transition-colors" },
                                React.createElement("img", { src: user.image || "https://api.dicebear.com/7.x/adventurer/svg?seed=" + user.email, alt: user.name, className: "w-7 h-7 rounded-full bg-slate-800 object-cover" }),
                                React.createElement("span", { className: "text-sm font-medium text-slate-300 max-w-[120px] truncate pr-2" }, user.name)),
                            showProfileDropdown && (React.createElement("div", { className: "absolute right-0 mt-2.5 w-52 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-1.5 text-left animate-in fade-in slide-in-from-top-2 duration-200" },
                                React.createElement("div", { className: "px-4 py-2 border-b border-slate-800" },
                                    React.createElement("p", { className: "text-xs text-slate-500" }, "Signed in as"),
                                    React.createElement("p", { className: "text-sm font-medium text-white truncate" }, user.email)),
                                React.createElement(link_1["default"], { href: "/dashboard", onClick: function () { return setShowProfileDropdown(false); }, className: "flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors" },
                                    React.createElement(lucide_react_1.LayoutDashboard, { className: "w-4 h-4" }),
                                    "My Dashboard"),
                                React.createElement("button", { onClick: handleLogout, className: "flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-800 transition-colors text-left" },
                                    React.createElement(lucide_react_1.LogOut, { className: "w-4 h-4" }),
                                    "Log out"))))) : (React.createElement(link_1["default"], { href: "/login", className: "px-5 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:brightness-105 active:scale-95 shadow-md shadow-teal-500/10 transition-all duration-200" }, "Sign In"))),
                    React.createElement("div", { className: "md:hidden flex items-center gap-2.5" },
                        React.createElement("button", { onClick: function () { setTempKey(geminiApiKey); setShowKeyModal(true); }, className: "p-1.5 rounded-lg border " + (geminiApiKey ? 'border-teal-500/30 text-teal-400' : 'border-slate-800 text-slate-400') },
                            React.createElement(lucide_react_1.Key, { className: "w-4 h-4" })),
                        React.createElement("button", { onClick: function () { return setIsOpen(!isOpen); }, className: "p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors" }, isOpen ? React.createElement(lucide_react_1.X, { className: "w-6 h-6" }) : React.createElement(lucide_react_1.Menu, { className: "w-6 h-6" }))))),
            isOpen && (React.createElement("div", { className: "md:hidden bg-slate-950 border-t border-slate-900 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-300" },
                publicLinks.map(function (link) { return (React.createElement(link_1["default"], { key: link.to, href: link.to, onClick: function () { return setIsOpen(false); }, className: pathname === link.to ? mobileActiveClassName : mobileInactiveClassName },
                    link.icon,
                    link.label)); }),
                user && protectedLinks.map(function (link) { return (React.createElement(link_1["default"], { key: link.to, href: link.to, onClick: function () { return setIsOpen(false); }, className: pathname === link.to ? mobileActiveClassName : mobileInactiveClassName },
                    link.icon,
                    link.label)); }),
                React.createElement("div", { className: "pt-4 border-t border-slate-800" }, user ? (React.createElement("div", { className: "space-y-2" },
                    React.createElement("div", { className: "flex items-center gap-3 px-3 py-2" },
                        React.createElement("img", { src: user.image, alt: "", className: "w-9 h-9 rounded-full bg-slate-800 object-cover" }),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-sm font-medium text-white" }, user.name),
                            React.createElement("p", { className: "text-xs text-slate-500 truncate max-w-[200px]" }, user.email))),
                    React.createElement("button", { onClick: handleLogout, className: "w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors" },
                        React.createElement(lucide_react_1.LogOut, { className: "w-4 h-4" }),
                        "Log Out"))) : (React.createElement(link_1["default"], { href: "/login", onClick: function () { return setIsOpen(false); }, className: "w-full block text-center px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium transition-colors" }, "Sign In")))))),
        showKeyModal && (React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" },
            React.createElement("div", { className: "w-full max-w-md bg-slate-900 border border-slate-850 rounded-2xl p-6 shadow-2xl animate-in scale-in duration-200" },
                React.createElement("div", { className: "flex items-center justify-between mb-4" },
                    React.createElement("h3", { className: "text-lg font-bold text-white flex items-center gap-2" },
                        React.createElement(lucide_react_1.Key, { className: "w-5 h-5 text-teal-400" }),
                        "Gemini API Key Settings"),
                    React.createElement("button", { onClick: function () { return setShowKeyModal(false); }, className: "text-slate-400 hover:text-white transition-colors" },
                        React.createElement(lucide_react_1.X, { className: "w-5 h-5" }))),
                React.createElement("p", { className: "text-sm text-slate-400 mb-4 leading-relaxed" }, "To activate premium AI Trip Generation and context-aware chat, please provide a Google Gemini API Key. If left empty, the application will use the local mock AI engine."),
                React.createElement("form", { onSubmit: handleSaveKey, className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Gemini API Key"),
                        React.createElement("input", { type: "password", value: tempKey, onChange: function (e) { return setTempKey(e.target.value); }, placeholder: "AIzaSy...", className: "w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-mono" })),
                    React.createElement("div", { className: "flex justify-end gap-3 pt-2" },
                        React.createElement("button", { type: "button", onClick: function () { return setShowKeyModal(false); }, className: "px-4 py-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors text-sm" }, "Cancel"),
                        React.createElement("button", { type: "submit", className: "px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium transition-colors text-sm" }, "Save Key"))))))));
}
exports["default"] = Navbar;
