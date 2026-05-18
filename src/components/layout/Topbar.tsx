import React from 'react';
import { Search, Bell, PlusCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const Topbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search tasks, boards, team..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent rounded-apple text-sm focus:bg-white focus:ring-2 focus:ring-ecotrophy-blue/10 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button 
          variant="secondary" 
          size="sm" 
          className="gap-2"
          onClick={() => navigate('/tasks/new')}
        >
          <PlusCircle size={18} />
          <span>New Task</span>
        </Button>
        <button className="p-2 text-slate-400 hover:text-ecotrophy-blue transition-colors">
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
};
