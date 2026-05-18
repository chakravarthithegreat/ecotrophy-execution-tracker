import React from 'react';
import { mockBlockers } from '../data/mockData';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Blockers: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-ecotrophy-navy">Active Blockers</h2>
          <p className="text-slate-500">Critical issues preventing task completion.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockBlockers.map(blocker => (
          <div key={blocker.id} className="premium-card p-6 border-l-4 border-rose-500 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertCircle size={20} />
                <span className="font-bold text-sm uppercase">Active Blocker</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">{blocker.createdAt}</span>
            </div>
            
            <h3 className="text-lg font-bold text-ecotrophy-navy mb-1">{blocker.taskTitle}</h3>
            <p className="text-slate-600 mb-6">{blocker.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-ecotrophy-navy border border-white shadow-sm">
                  {blocker.ownerName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-500">{blocker.ownerName}</span>
              </div>
              <Button variant="secondary" size="sm" className="gap-2 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 shadow-sm">
                <CheckCircle2 size={16} />
                <span>Mark Resolved</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
