import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { boards } from '../data/mockData';
import { MetricCard } from '../components/ui/MetricCard';
import { 
  CheckSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  ArrowLeft,
  Plus
} from 'lucide-react';
import { TaskStatusBadge, PriorityBadge } from '../components/ui/Badges';
import { Button } from '../components/ui/Button';
import { TaskTimeline } from '../components/ui/TaskTimeline';
import { firestoreService } from '../services/firestore';
import type { Task, Board } from '../types';

export const BoardDetail: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const [view, setView] = useState<'table' | 'timeline'>('timeline');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  
  // For V1, we still pull board info from mockData or fetch from Firestore if ID matches
  const board = boards.find(b => b.id === boardId) || ({} as Board);

  useEffect(() => {
    if (!boardId) return;

    setLoading(true);
    const unsubscribe = firestoreService.subscribeToTasks(boardId, (fetchedTasks) => {
      setTasks(fetchedTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [boardId]);

  if (!boardId) return <div>Board ID missing</div>;

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => navigate('/boards')}
        className="flex items-center gap-2 text-slate-400 hover:text-ecotrophy-blue transition-colors mb-6 group"
      >
        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back to Boards</span>
      </button>

      <header className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: board.color || '#CBD5E1' }} />
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              {board.departmentName || 'Project'}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-ecotrophy-navy">{board.title || 'Board'}</h2>
        </div>
        <Button className="gap-2 shadow-lg shadow-ecotrophy-blue/20" onClick={() => navigate('/tasks/new')}>
          <Plus size={20} />
          <span>Add Task</span>
        </Button>
      </header>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ecotrophy-blue"></div>
          <p className="text-slate-400 font-medium">Syncing execution data...</p>
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <MetricCard label="Total Tasks" value={tasks.length} icon={CheckSquare} />
          <MetricCard label="Done" value={tasks.filter(t => t.status === 'Done').length} icon={CheckCircle2} color="text-emerald-500" />
          <MetricCard label="Blocked" value={tasks.filter(t => t.blocker).length} icon={AlertTriangle} color="text-amber-500" />
          <MetricCard label="Overdue" value={tasks.filter(t => new Date(t.deadline) < new Date() && t.status !== 'Done').length} icon={Clock} color="text-rose-500" />
        </div>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-ecotrophy-navy">Task Tracker</h3>
              <div className="flex bg-slate-100 p-1 rounded-apple shadow-inner">
                <button 
                  onClick={() => setView('timeline')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'timeline' ? 'bg-white text-ecotrophy-blue shadow-sm' : 'text-slate-500'}`}
                >
                  Timeline
                </button>
                <button 
                  onClick={() => setView('table')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'table' ? 'bg-white text-ecotrophy-blue shadow-sm' : 'text-slate-500'}`}
                >
                  Table
                </button>
              </div>
            </div>

            {view === 'timeline' ? (
              <TaskTimeline tasks={tasks} />
            ) : (
              <div className="premium-card overflow-hidden bg-white/80 backdrop-blur-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Task</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Owner</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Deadline</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {tasks.length > 0 ? tasks.map(task => (
                        <tr key={task.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-semibold text-ecotrophy-navy group-hover:text-ecotrophy-blue transition-colors">
                                {task.title}
                              </span>
                              {task.blocker && (
                                <span className="text-[10px] text-rose-500 font-bold mt-1 uppercase flex items-center gap-1">
                                  <AlertTriangle size={10} /> Blocked
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500">{task.ownerName}</td>
                          <td className="px-6 py-4"><PriorityBadge priority={task.priority} /></td>
                          <td className="px-6 py-4 text-sm text-slate-500">{task.deadline}</td>
                          <td className="px-6 py-4"><TaskStatusBadge status={task.status} /></td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                            <div className="flex flex-col items-center gap-2">
                              <CheckSquare size={40} className="opacity-20" />
                              <p>No tasks found for this board.</p>
                              <Button variant="ghost" className="text-ecotrophy-blue" onClick={() => navigate('/tasks/new')}>
                                Create the first task
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};
