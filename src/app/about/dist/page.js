"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var AboutPage = function () {
    var team = [
        {
            name: "Marcus Vance",
            role: "Lead Architect / AI Lead",
            bio: "Former systems researcher specializing in generative model constraints and stateful routing.",
            image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus"
        },
        {
            name: "Sophia Chen",
            role: "UX/UI Designer",
            bio: "Passionate about creating premium, accessible, and responsive user experiences.",
            image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia"
        },
        {
            name: "Liam O'Connor",
            role: "Core Developer",
            bio: "Full-stack engineer focusing on lightweight state sync and local storage databases.",
            image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam"
        }
    ];
    var techStack = [
        { name: "React.js", desc: "Modular component hierarchies", icon: react_1["default"].createElement(lucide_react_1.Cpu, { className: "w-5 h-5 text-teal-400" }) },
        { name: "TypeScript", desc: "Type-safe interfaces", icon: react_1["default"].createElement(lucide_react_1.Code, { className: "w-5 h-5 text-indigo-400" }) },
        { name: "Tailwind CSS", desc: "Glassmorphism layouts", icon: react_1["default"].createElement(lucide_react_1.Eye, { className: "w-5 h-5 text-emerald-400" }) },
        { name: "Gemini Pro", desc: "Context-aware processing", icon: react_1["default"].createElement(lucide_react_1.Sparkles, { className: "w-5 h-5 text-purple-400" }) },
        { name: "Recharts", desc: "Real-time cost visualization", icon: react_1["default"].createElement(lucide_react_1.Cpu, { className: "w-5 h-5 text-rose-400" }) },
        { name: "LocalStorage", desc: "Persistent offline schemas", icon: react_1["default"].createElement(lucide_react_1.Database, { className: "w-5 h-5 text-amber-400" }) }
    ];
    return (react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20" },
        react_1["default"].createElement("section", { className: "text-center max-w-3xl mx-auto space-y-6" },
            react_1["default"].createElement("h1", { className: "text-4xl sm:text-5xl font-extrabold text-white tracking-tight" },
                "About ",
                react_1["default"].createElement("span", { className: "bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent" }, "TravelGenie AI")),
            react_1["default"].createElement("p", { className: "text-lg text-slate-400 leading-relaxed" }, "We believe travel planning should be inspiring, not exhausting. TravelGenie AI was built to solve the hassle of manually building daily schedules by integrating intelligent, reasoning AI agents.")),
        react_1["default"].createElement("section", { className: "grid grid-cols-1 md:grid-cols-3 gap-8" },
            react_1["default"].createElement("div", { className: "glass-card p-6 space-y-3" },
                react_1["default"].createElement("div", { className: "w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400" },
                    react_1["default"].createElement(lucide_react_1.Compass, { className: "w-5 h-5" })),
                react_1["default"].createElement("h3", { className: "text-lg font-bold text-white" }, "Smart Navigation"),
                react_1["default"].createElement("p", { className: "text-slate-400 text-sm leading-relaxed" }, "AI recommendations custom-tailored to your exact constraints, ensuring a perfect balance of downtime and activities.")),
            react_1["default"].createElement("div", { className: "glass-card p-6 space-y-3" },
                react_1["default"].createElement("div", { className: "w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400" },
                    react_1["default"].createElement(lucide_react_1.Shield, { className: "w-5 h-5" })),
                react_1["default"].createElement("h3", { className: "text-lg font-bold text-white" }, "Budget Transparency"),
                react_1["default"].createElement("p", { className: "text-slate-400 text-sm leading-relaxed" }, "Dynamic cost summation and allocation graphs. You always know exactly where your travel budget is going.")),
            react_1["default"].createElement("div", { className: "glass-card p-6 space-y-3" },
                react_1["default"].createElement("div", { className: "w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400" },
                    react_1["default"].createElement(lucide_react_1.Heart, { className: "w-5 h-5" })),
                react_1["default"].createElement("h3", { className: "text-lg font-bold text-white" }, "Plan Evolution"),
                react_1["default"].createElement("p", { className: "text-slate-400 text-sm leading-relaxed" }, "Seamless editing history that preserves every iteration of your trip, letting you compare versions with visual highlights."))),
        react_1["default"].createElement("section", { className: "space-y-10" },
            react_1["default"].createElement("div", { className: "text-center space-y-3" },
                react_1["default"].createElement("h2", { className: "text-3xl font-bold text-white" }, "Our Technology Stack"),
                react_1["default"].createElement("p", { className: "text-slate-400 text-sm" }, "Building on modern, robust web standards.")),
            react_1["default"].createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" }, techStack.map(function (tech, idx) { return (react_1["default"].createElement("div", { key: idx, className: "glass-card p-5 text-center flex flex-col items-center justify-center space-y-2.5" },
                react_1["default"].createElement("div", { className: "p-2.5 rounded-lg bg-slate-950 border border-slate-800" }, tech.icon),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("h4", { className: "font-bold text-white text-xs" }, tech.name),
                    react_1["default"].createElement("p", { className: "text-[10px] text-slate-500 mt-0.5" }, tech.desc)))); }))),
        react_1["default"].createElement("section", { className: "space-y-10" },
            react_1["default"].createElement("div", { className: "text-center space-y-3" },
                react_1["default"].createElement("h2", { className: "text-3xl font-bold text-white" }, "Meet the Team"),
                react_1["default"].createElement("p", { className: "text-slate-400 text-sm" }, "The minds engineering intelligent travel.")),
            react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8" }, team.map(function (member, idx) { return (react_1["default"].createElement("div", { key: idx, className: "glass-card p-6 flex flex-col items-center text-center space-y-4" },
                react_1["default"].createElement("img", { src: member.image, alt: member.name, className: "w-24 h-24 rounded-full bg-slate-800 border border-slate-700 object-cover shadow-inner" }),
                react_1["default"].createElement("div", { className: "space-y-1" },
                    react_1["default"].createElement("h4", { className: "font-bold text-white text-base" }, member.name),
                    react_1["default"].createElement("p", { className: "text-xs text-teal-400 font-semibold uppercase tracking-wider" }, member.role)),
                react_1["default"].createElement("p", { className: "text-slate-400 text-xs leading-relaxed" }, member.bio))); })))));
};
exports["default"] = AboutPage;
