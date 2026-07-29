"use client";

import { useState } from "react";

type Trip = {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "completed" | "planning";
  budget: number;
  spent: number;
};

const MOCK_TRIPS: Trip[] = [
  {
    id: "1",
    destination: "Kyoto, Japan",
    startDate: "2026-09-12",
    endDate: "2026-09-20",
    status: "upcoming",
    budget: 2500,
    spent: 800,
  },
  {
    id: "2",
    destination: "Lisbon, Portugal",
    startDate: "2026-11-03",
    endDate: "2026-11-10",
    status: "planning",
    budget: 1800,
    spent: 150,
  },
  {
    id: "3",
    destination: "Cape Town, South Africa",
    startDate: "2026-03-01",
    endDate: "2026-03-14",
    status: "completed",
    budget: 3200,
    spent: 3050,
  },
];

function statusColor(status: Trip["status"]) {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-700";
    case "planning":
      return "bg-yellow-100 text-yellow-700";
    case "completed":
      return "bg-green-100 text-green-700";
  }
}

function formatDateRange(start: string, end: string) {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const s = new Date(start).toLocaleDateString("en-US", opts);
  const e = new Date(end).toLocaleDateString("en-US", opts);
  return `${s} – ${e}`;
}

export default function DashboardPage() {
  const [trips] = useState<Trip[]>(MOCK_TRIPS);

  const upcomingCount = trips.filter((t) => t.status === "upcoming").length;
  const planningCount = trips.filter((t) => t.status === "planning").length;
  const totalBudget = trips.reduce((sum, t) => sum + t.budget, 0);
  const totalSpent = trips.reduce((sum, t) => sum + t.spent, 0);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Here's an overview of your trips and travel plans.
          </p>
        </header>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Upcoming Trips" value={upcomingCount} />
          <StatCard label="Planning" value={planningCount} />
          <StatCard label="Total Budget" value={`$${totalBudget.toLocaleString()}`} />
          <StatCard label="Total Spent" value={`$${totalSpent.toLocaleString()}`} />
        </div>

        {/* Trips list */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Your Trips</h2>

          {trips.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <p className="text-gray-500">No trips yet. Start planning your next adventure!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {trips.map((trip) => {
                const pct = Math.min(
                  100,
                  Math.round((trip.spent / trip.budget) * 100)
                );
                return (
                  <div
                    key={trip.id}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {trip.destination}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColor(
                          trip.status
                        )}`}
                      >
                        {trip.status}
                      </span>
                    </div>

                    <p className="mb-4 text-sm text-gray-500">
                      {formatDateRange(trip.startDate, trip.endDate)}
                    </p>

                    <div className="mb-1 flex justify-between text-sm text-gray-600">
                      <span>
                        ${trip.spent.toLocaleString()} spent
                      </span>
                      <span>${trip.budget.toLocaleString()} budget</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}