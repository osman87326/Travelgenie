import React from 'react';

interface SkeletonProps {
  type: 'card' | 'details' | 'table';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({ type, count = 1 }) => {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((_, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl overflow-hidden h-[390px] flex flex-col animate-pulse">
            <div className="h-48 bg-slate-850 w-full" />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-4 bg-slate-800 rounded w-1/4" />
                <div className="h-6 bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-800 rounded w-full" />
                <div className="h-4 bg-slate-800 rounded w-5/6" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="h-5 bg-slate-800 rounded w-1/3" />
                <div className="h-9 bg-slate-800 rounded-lg w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'details') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-8">
        <div className="h-[400px] bg-slate-850 rounded-2xl w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-10 bg-slate-850 rounded w-1/3" />
            <div className="h-4 bg-slate-800 rounded w-full" />
            <div className="h-4 bg-slate-800 rounded w-full" />
            <div className="h-4 bg-slate-800 rounded w-5/6" />
            <div className="h-40 bg-slate-850 rounded-xl" />
          </div>
          <div className="space-y-6">
            <div className="h-40 bg-slate-850 rounded-xl" />
            <div className="h-60 bg-slate-850 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/40 animate-pulse">
        <div className="h-12 bg-slate-850 border-b border-slate-800" />
        <div className="divide-y divide-slate-800/60">
          {items.map((_, idx) => (
            <div key={idx} className="h-16 px-6 flex items-center justify-between">
              <div className="flex items-center gap-3 w-1/3">
                <div className="w-10 h-10 rounded bg-slate-800" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-850 rounded w-1/2" />
                </div>
              </div>
              <div className="h-4 bg-slate-800 rounded w-1/6" />
              <div className="h-4 bg-slate-800 rounded w-1/6" />
              <div className="flex gap-2 w-1/12 justify-end">
                <div className="w-8 h-8 rounded bg-slate-800" />
                <div className="w-8 h-8 rounded bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
