import React from 'react';

export const Team: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-ecotrophy-navy">Team Directory</h2>
        <p className="text-slate-500 font-medium">Manage team members and departmental access.</p>
      </header>
      <div className="premium-card p-12 text-center bg-white/80 backdrop-blur-md shadow-xl border border-white/20">
        <p className="text-slate-400 font-medium italic">Team management features coming in Sprint 2.</p>
      </div>
    </div>
  );
};
