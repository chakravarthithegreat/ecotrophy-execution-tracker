import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTasks } from '../data/mockData';
import { TaskStatusBadge, PriorityBadge } from '../components/ui/Badges';

export const MyTasks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-ecotrophy-navy">My Tasks</h2>
        <p className="text-slate-500 font-medium">Tasks assigned directly to you.</p>
      </header>

      <div className="premium-card overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-white/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Task</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Board</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockTasks.map(task => (
                <tr key={task.id} onClick={() => navigate(`/tasks/${task.id}`)} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-semibold text-ecotrophy-navy group-hover:text-ecotrophy-blue transition-colors">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    <span className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold uppercase tracking-tight">
                      {task.boardId?.split('-')[1] || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4"><PriorityBadge priority={task.priority} /></td>
                  <td className="px-6 py-4 text-sm text-slate-500">{task.deadline}</td>
                  <td className="px-6 py-4"><TaskStatusBadge status={task.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
