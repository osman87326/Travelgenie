"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
function Footer() {
    var _a = react_1.useState(''), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(false), subscribed = _b[0], setSubscribed = _b[1];
    var handleSubscribe = function (e) {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
            setTimeout(function () { return setSubscribed(false); }, 3000);
        }
    };
    return (React.createElement("footer", { className: "bg-slate-950 border-t border-slate-900 text-slate-400" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" },
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8 mb-12" },
                React.createElement("div", { className: "space-y-4" },
                    React.createElement(link_1["default"], { href: "/", className: "flex items-center gap-2" },
                        React.createElement("div", { className: "w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center" },
                            React.createElement(lucide_react_1.Sparkles, { className: "w-5 h-5 text-white" })),
                        React.createElement("span", { className: "text-lg font-bold text-white tracking-tight" }, "TravelGenie AI")),
                    React.createElement("p", { className: "text-sm text-slate-500 leading-relaxed" }, "Synthesizing cutting-edge generative AI models to construct highly personalized, detailed, and optimized travel itineraries for global travelers."),
                    React.createElement("div", { className: "flex space-x-4" },
                        React.createElement("a", { href: "https://github.com", target: "_blank", rel: "noopener noreferrer", className: "hover:text-white transition-colors" },
                            React.createElement(lucide_react_1.Github, { className: "w-5 h-5" })),
                        React.createElement("a", { href: "https://twitter.com", target: "_blank", rel: "noopener noreferrer", className: "hover:text-teal-400 transition-colors" },
                            React.createElement(lucide_react_1.Twitter, { className: "w-5 h-5" })),
                        React.createElement("a", { href: "https://linkedin.com", target: "_blank", rel: "noopener noreferrer", className: "hover:text-indigo-400 transition-colors" },
                            React.createElement(lucide_react_1.Linkedin, { className: "w-5 h-5" })),
                        React.createElement("a", { href: "https://instagram.com", target: "_blank", rel: "noopener noreferrer", className: "hover:text-pink-400 transition-colors" },
                            React.createElement(lucide_react_1.Instagram, { className: "w-5 h-5" })))),
                React.createElement("div", null,
                    React.createElement("h3", { className: "text-sm font-semibold text-white uppercase tracking-wider mb-4" }, "Navigations"),
                    React.createElement("ul", { className: "space-y-2.5 text-sm" },
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/", className: "hover:text-teal-400 transition-colors" }, "Home Landing")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/explore", className: "hover:text-teal-400 transition-colors" }, "Explore Catalog")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/about", className: "hover:text-teal-400 transition-colors" }, "Our Story (About)")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/contact", className: "hover:text-teal-400 transition-colors" }, "Support (Contact)")))),
                React.createElement("div", null,
                    React.createElement("h3", { className: "text-sm font-semibold text-white uppercase tracking-wider mb-4" }, "Get In Touch"),
                    React.createElement("ul", { className: "space-y-3 text-sm" },
                        React.createElement("li", { className: "flex items-start gap-2.5" },
                            React.createElement(lucide_react_1.MapPin, { className: "w-4 h-4 text-teal-400 shrink-0 mt-0.5" }),
                            React.createElement("span", null, "123 Innovation Boulevard, Suite 500, Tech City, TC 94016")),
                        React.createElement("li", { className: "flex items-center gap-2.5" },
                            React.createElement(lucide_react_1.Phone, { className: "w-4 h-4 text-teal-400 shrink-0" }),
                            React.createElement("span", null, "+1 (555) 893-2741")),
                        React.createElement("li", { className: "flex items-center gap-2.5" },
                            React.createElement(lucide_react_1.Mail, { className: "w-4 h-4 text-teal-400 shrink-0" }),
                            React.createElement("span", null, "support@travelgenie.ai")))),
                React.createElement("div", { className: "space-y-4" },
                    React.createElement("h3", { className: "text-sm font-semibold text-white uppercase tracking-wider mb-4" }, "Newsletter"),
                    React.createElement("p", { className: "text-xs text-slate-500 leading-relaxed" }, "Subscribe to receive updates on newly discovered destinations and intelligent planning releases."),
                    React.createElement("form", { onSubmit: handleSubscribe, className: "flex gap-2" },
                        React.createElement("input", { type: "email", required: true, value: email, onChange: function (e) { return setEmail(e.target.value); }, placeholder: "Enter your email", className: "w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-650 focus:outline-none focus:border-teal-500" }),
                        React.createElement("button", { type: "submit", className: "px-3 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-500 active:scale-95 transition-all flex items-center justify-center shrink-0" },
                            React.createElement(lucide_react_1.ArrowRight, { className: "w-4 h-4" }))),
                    subscribed && (React.createElement("p", { className: "text-xs text-emerald-400 animate-pulse" }, "Subscription successful! Thank you.")))),
            React.createElement("div", { className: "pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4" },
                React.createElement("p", null,
                    "\u00A9 ",
                    new Date().getFullYear(),
                    " TravelGenie AI. All rights reserved."),
                React.createElement("div", { className: "flex space-x-6" },
                    React.createElement(link_1["default"], { href: "/about", className: "hover:text-slate-400 transition-colors" }, "Privacy Policy"),
                    React.createElement(link_1["default"], { href: "/about", className: "hover:text-slate-400 transition-colors" }, "Terms of Service"),
                    React.createElement(link_1["default"], { href: "/contact", className: "hover:text-slate-400 transition-colors" }, "Cookies Settings"))))));
}
exports["default"] = Footer;
