import React from 'react';
import { MetricCard } from '../components/ui/MetricCard';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Target,
  ArrowRight,
  Zap
} from 'lucide-react';
import { mockTasks } from '../data/mockData';
import { PriorityBadge, TaskStatusBadge } from '../components/ui/Badges';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/useAuth';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const userName = user?.email?.split('@')[0] || 'Founder';

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-ecotrophy-blue/10 text-ecotrophy-blue rounded-full text-sm font-bold mb-4">
          <Zap size={16} className="fill-ecotrophy-blue" />
          <span>System Active</span>
        </div>
        <h2 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-ecotrophy-navy via-ecotrophy-blue to-blue-400 pb-2">
          Execution OS
        </h2>
        <p className="text-lg text-slate-500 font-medium mt-1">Welcome back, <span className="text-ecotrophy-navy font-bold">{userName}</span>. Here is your operational pulse.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard 
          label="Total Tasks" 
          value={42} 
          icon={Target} 
          color="text-ecotrophy-blue"
        />
        <MetricCard 
          label="Completed" 
          value={28} 
          icon={CheckCircle2} 
          trend={{ value: 12, isUp: true }}
          color="text-emerald-500"
        />
        <MetricCard 
          label="Overdue" 
          value={3} 
          icon={Clock} 
          color="text-rose-500"
        />
        <MetricCard 
          label="Active Blockers" 
          value={2} 
          icon={AlertTriangle} 
          color="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Must-Win Tasks */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-ecotrophy-navy flex items-center gap-2">
              Today's 3 Must-Win Tasks
            </h3>
            <Button variant="ghost" size="sm" className="text-ecotrophy-blue font-bold gap-1 hover:bg-ecotrophy-blue/10">
              View All <ArrowRight size={16} />
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockTasks.slice(0, 3).map(task => (
              <div key={task.id} className="premium-card p-6 border-l-4 border-l-ecotrophy-blue hover:border-l-ecotrophy-lime transition-all cursor-pointer group bg-white/80 backdrop-blur-md">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-ecotrophy-navy group-hover:text-ecotrophy-blue transition-colors">
                      {task.title}
                    </h4>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-1">{task.description}</p>
                  </div>
                  <PriorityBadge priority={task.priority} />
                </div>
                <div className="flex items-center gap-4 mt-5 text-sm font-medium text-slate-400">
                  <TaskStatusBadge status={task.status} />
                  <span className="flex items-center gap-1"><Clock size={14} /> {task.deadline}</span>
                  <span className="bg-slate-100 px-2 py-1 rounded-md text-slate-600">👤 {task.ownerName}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Stats / Right Sidebar */}
        <section className="space-y-6">
          <div className="premium-card p-8 bg-gradient-to-br from-ecotrophy-navy to-slate-900 text-white shadow-2xl shadow-ecotrophy-navy/30 relative overflow-hidden group">
            {/* Background energetic element */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-ecotrophy-lime opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity duration-500" />
            
            <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2">
              <Zap className="text-ecotrophy-lime" size={20} /> Tomorrow's Focus
            </h3>
            <ul className="space-y-4 text-sm text-slate-300 font-medium">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-ecotrophy-lime shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
                Quarterly Board Meeting
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-ecotrophy-lime shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
                Product Roadmap Sync
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-ecotrophy-lime shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
                Investor Update Email
              </li>
            </ul>
            <Button variant="primary" className="w-full mt-8 bg-ecotrophy-lime text-ecotrophy-navy font-extrabold hover:bg-white transition-colors border-none shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]">
              Set Focus
            </Button>
          </div>

          <div className="premium-card p-6 bg-white/80 backdrop-blur-md border border-rose-100">
            <h3 className="text-lg font-bold text-ecotrophy-navy mb-4 flex items-center gap-2">
              <AlertTriangle className="text-rose-500" size={18} /> Recent Blockers
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-rose-50 to-white border border-rose-100 rounded-apple">
                <p className="text-sm font-bold text-rose-800">API Documentation Missing</p>
                <p className="text-xs font-semibold text-rose-600/70 mt-1 uppercase tracking-wider">Stalling R&D Board</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4 text-sm font-semibold text-slate-500 hover:text-ecotrophy-navy">
              View All Blockers
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};
