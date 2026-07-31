"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
function NotFound() {
    return (React.createElement("main", { className: "flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white px-6" },
        React.createElement("h1", { className: "text-7xl font-bold text-teal-400" }, "404"),
        React.createElement("h2", { className: "mt-4 text-2xl font-semibold" }, "Page Not Found"),
        React.createElement("p", { className: "mt-2 text-slate-400 text-center max-w-md" }, "Sorry, the page you're looking for doesn't exist or has been moved."),
        React.createElement(link_1["default"], { href: "/", className: "mt-8 rounded-lg bg-teal-600 px-6 py-3 font-medium text-white hover:bg-teal-500 transition" }, "Go Back Home")));
}
exports["default"] = NotFound;
