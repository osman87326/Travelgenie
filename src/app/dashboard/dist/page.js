"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var MOCK_TRIPS = [
    {
        id: "1",
        destination: "Kyoto, Japan",
        startDate: "2026-09-12",
        endDate: "2026-09-20",
        status: "upcoming",
        budget: 2500,
        spent: 800
    },
    {
        id: "2",
        destination: "Lisbon, Portugal",
        startDate: "2026-11-03",
        endDate: "2026-11-10",
        status: "planning",
        budget: 1800,
        spent: 150
    },
    {
        id: "3",
        destination: "Cape Town, South Africa",
        startDate: "2026-03-01",
        endDate: "2026-03-14",
        status: "completed",
        budget: 3200,
        spent: 3050
    },
];
function statusColor(status) {
    switch (status) {
        case "upcoming":
            return "bg-blue-100 text-blue-700";
        case "planning":
            return "bg-yellow-100 text-yellow-700";
        case "completed":
            return "bg-green-100 text-green-700";
    }
}
function formatDateRange(start, end) {
    var opts = { month: "short", day: "numeric" };
    var s = new Date(start).toLocaleDateString("en-US", opts);
    var e = new Date(end).toLocaleDateString("en-US", opts);
    return s + " \u2013 " + e;
}
function DashboardPage() {
    var trips = react_1.useState(MOCK_TRIPS)[0];
    var upcomingCount = trips.filter(function (t) { return t.status === "upcoming"; }).length;
    var planningCount = trips.filter(function (t) { return t.status === "planning"; }).length;
    var totalBudget = trips.reduce(function (sum, t) { return sum + t.budget; }, 0);
    var totalSpent = trips.reduce(function (sum, t) { return sum + t.spent; }, 0);
    return (React.createElement("div", { className: "min-h-screen bg-gray-50 px-6 py-10" },
        React.createElement("div", { className: "mx-auto max-w-5xl" },
            React.createElement("header", { className: "mb-8" },
                React.createElement("h1", { className: "text-3xl font-bold text-gray-900" }, "Dashboard"),
                React.createElement("p", { className: "mt-1 text-gray-500" }, "Here's an overview of your trips and travel plans.")),
            React.createElement("div", { className: "mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" },
                React.createElement(StatCard, { label: "Upcoming Trips", value: upcomingCount }),
                React.createElement(StatCard, { label: "Planning", value: planningCount }),
                React.createElement(StatCard, { label: "Total Budget", value: "$" + totalBudget.toLocaleString() }),
                React.createElement(StatCard, { label: "Total Spent", value: "$" + totalSpent.toLocaleString() })),
            React.createElement("section", null,
                React.createElement("h2", { className: "mb-4 text-xl font-semibold text-gray-900" }, "Your Trips"),
                trips.length === 0 ? (React.createElement("div", { className: "rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center" },
                    React.createElement("p", { className: "text-gray-500" }, "No trips yet. Start planning your next adventure!"))) : (React.createElement("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2" }, trips.map(function (trip) {
                    var pct = Math.min(100, Math.round((trip.spent / trip.budget) * 100));
                    return (React.createElement("div", { key: trip.id, className: "rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md" },
                        React.createElement("div", { className: "mb-2 flex items-start justify-between" },
                            React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, trip.destination),
                            React.createElement("span", { className: "rounded-full px-3 py-1 text-xs font-medium capitalize " + statusColor(trip.status) }, trip.status)),
                        React.createElement("p", { className: "mb-4 text-sm text-gray-500" }, formatDateRange(trip.startDate, trip.endDate)),
                        React.createElement("div", { className: "mb-1 flex justify-between text-sm text-gray-600" },
                            React.createElement("span", null,
                                "$",
                                trip.spent.toLocaleString(),
                                " spent"),
                            React.createElement("span", null,
                                "$",
                                trip.budget.toLocaleString(),
                                " budget")),
                        React.createElement("div", { className: "h-2 w-full rounded-full bg-gray-100" },
                            React.createElement("div", { className: "h-2 rounded-full bg-blue-500", style: { width: pct + "%" } }))));
                })))))));
}
exports["default"] = DashboardPage;
function StatCard(_a) {
    var label = _a.label, value = _a.value;
    return (React.createElement("div", { className: "rounded-xl border border-gray-200 bg-white p-5 shadow-sm" },
        React.createElement("p", { className: "text-sm text-gray-500" }, label),
        React.createElement("p", { className: "mt-1 text-2xl font-bold text-gray-900" }, value)));
}
