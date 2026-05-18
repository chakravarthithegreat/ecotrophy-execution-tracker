import React from 'react';
import type { TaskStatus, Priority } from '../../types/index';

export const TaskStatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const styles = {
    'To Do': 'bg-slate-100 text-slate-600',
    'Doing': 'bg-blue-100 text-blue-600',
    'Done': 'bg-emerald-100 text-emerald-600',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
  const styles = {
    'High': 'bg-rose-100 text-rose-600',
    'Medium': 'bg-amber-100 text-amber-600',
    'Low': 'bg-slate-100 text-slate-600',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[priority]}`}>
      {priority}
    </span>
  );
};
