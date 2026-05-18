import React from 'react';
import { Button } from '../components/ui/Button';
import { Sparkles, Target, Trophy } from 'lucide-react';

export const DailyReview: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-ecotrophy-navy mb-2">Daily Review</h2>
        <p className="text-slate-500 font-medium">Reflect on today's execution and prime for tomorrow.</p>
      </header>

      <div className="space-y-8">
        <section className="premium-card p-8 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shadow-sm">
              <Trophy size={20} />
            </div>
            <h3 className="text-lg font-bold text-ecotrophy-navy">Today's Big Wins</h3>
          </div>
          <textarea 
            className="input-field min-h-[140px] resize-none focus:ring-emerald-500/20 border-slate-100"
            placeholder="What did we achieve today? List the major milestones..."
          ></textarea>
        </section>

        <section className="premium-card p-8 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-ecotrophy-blue/5 text-ecotrophy-blue shadow-sm">
              <Target size={20} />
            </div>
            <h3 className="text-lg font-bold text-ecotrophy-navy">Tomorrow's Must-Wins</h3>
          </div>
          <div className="space-y-4">
            <div className="group flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">1</span>
              <input type="text" className="input-field border-slate-100" placeholder="Primary goal for tomorrow" />
            </div>
            <div className="group flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">2</span>
              <input type="text" className="input-field border-slate-100" placeholder="Secondary goal" />
            </div>
            <div className="group flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">3</span>
              <input type="text" className="input-field border-slate-100" placeholder="Tertiary goal" />
            </div>
          </div>
        </section>

        <div className="flex justify-center pt-4">
          <Button className="px-12 py-4 text-lg gap-2 shadow-xl shadow-ecotrophy-blue/25 hover:scale-105 active:scale-95 transition-all rounded-2xl font-bold tracking-wide">
            <Sparkles size={20} className="text-ecotrophy-lime" />
            Complete Review
          </Button>
        </div>
      </div>
    </div>
  );
};
