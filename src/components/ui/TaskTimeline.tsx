import React from 'react';
import type { Task } from '../../types/index';
import { PriorityBadge } from '../ui/Badges';
import { format, addDays, startOfToday } from 'date-fns';

interface TaskTimelineProps {
  tasks: Task[];
}

export const TaskTimeline: React.FC<TaskTimelineProps> = ({ tasks }) => {
  const today = startOfToday();
  const days = Array.from({ length: 14 }, (_, i) => addDays(today, i - 2));

  return (
    <div className="premium-card overflow-hidden">
      <div className="p-6 border-b border-white/20 flex items-center justify-between">
        <h3 className="font-bold text-ecotrophy-navy">Execution Timeline</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-ecotrophy-blue rounded-sm" />
            <span>Assigned</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
            <span>Done</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Header row with days */}
          <div className="flex border-b border-slate-100">
            <div className="w-64 shrink-0 p-4 font-bold text-xs text-slate-400 uppercase border-r border-slate-100">Task Details</div>
            <div className="flex-1 flex">
              {days.map((day, i) => (
                <div key={i} className={`flex-1 p-4 text-center border-r border-slate-50 last:border-r-0 ${format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') ? 'bg-ecotrophy-blue/5' : ''}`}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{format(day, 'EEE')}</p>
                  <p className={`text-xs font-bold ${format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') ? 'text-ecotrophy-blue' : 'text-ecotrophy-navy'}`}>
                    {format(day, 'd')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Task rows */}
          <div className="divide-y divide-slate-50">
            {tasks.map((task) => {
              const deadlineDate = new Date(task.deadline);
              const taskDayIndex = days.findIndex(d => format(d, 'yyyy-MM-dd') === format(deadlineDate, 'yyyy-MM-dd'));
              
              return (
                <div key={task.id} className="flex hover:bg-slate-50/50 transition-colors group">
                  <div className="w-64 shrink-0 p-4 border-r border-slate-100">
                    <h4 className="text-sm font-bold text-ecotrophy-navy truncate group-hover:text-ecotrophy-blue transition-colors">
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-2">
                      <PriorityBadge priority={task.priority} />
                      <span className="text-[10px] text-slate-400 font-medium">@{task.ownerName.split(' ')[0]}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex relative items-center">
                    {/* Visualizing the task bar */}
                    {taskDayIndex !== -1 && (
                      <div 
                        className={`absolute h-8 rounded-apple shadow-sm flex items-center px-3 text-[10px] font-bold text-white transition-all
                          ${task.status === 'Done' ? 'bg-emerald-500 shadow-emerald-200' : 'bg-ecotrophy-blue shadow-ecotrophy-blue/20'}
                        `}
                        style={{ 
                          left: `${(taskDayIndex / days.length) * 100}%`,
                          width: '120px',
                          zIndex: 10
                        }}
                      >
                        <span className="truncate">{task.status}</span>
                      </div>
                    )}
                    
                    {/* Grid background lines */}
                    {days.map((_, i) => (
                      <div key={i} className={`flex-1 h-16 border-r border-slate-50/50 last:border-r-0`} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
