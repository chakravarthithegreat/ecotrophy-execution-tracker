import React from 'react';
import { boards } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Layers, ChevronRight } from 'lucide-react';

export const Boards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-ecotrophy-navy">Department Boards</h2>
        <p className="text-slate-500">Manage execution across all company verticals.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map(board => (
          <div 
            key={board.id}
            onClick={() => navigate(`/boards/${board.id}`)}
            className="premium-card hover:border-ecotrophy-blue/30 transition-all cursor-pointer group bg-white/80 backdrop-blur-md overflow-hidden flex flex-col shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <div className="h-1.5 w-full" style={{ backgroundColor: board.color }} />
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-slate-50 text-ecotrophy-blue group-hover:bg-ecotrophy-blue group-hover:text-white transition-all duration-300">
                  <Layers size={24} />
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">DONE</p>
                    <p className="text-lg font-bold text-ecotrophy-navy">{board.metrics.done}</p>
                  </div>
                  <div className="text-center border-l border-slate-100 pl-4">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">TOTAL</p>
                    <p className="text-lg font-bold text-ecotrophy-navy">{board.metrics.totalTasks}</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{board.departmentName}</p>
                <h3 className="text-xl font-bold text-ecotrophy-navy group-hover:text-ecotrophy-blue transition-colors mb-4">
                  {board.title}
                </h3>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm">
                        U{i}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-ecotrophy-blue/10 flex items-center justify-center text-[10px] font-bold text-ecotrophy-blue shadow-sm">
                      +2
                    </div>
                  </div>
                  <div className="flex items-center text-ecotrophy-blue font-bold text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Board
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
