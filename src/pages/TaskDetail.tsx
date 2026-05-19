import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckSquare, Link as LinkIcon, UserRound } from 'lucide-react';
import { boards, mockTasks } from '../data/mockData';
import { PriorityBadge, TaskStatusBadge } from '../components/ui/Badges';
import { Button } from '../components/ui/Button';

export const TaskDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const task = mockTasks.find(item => item.id === taskId);

  if (!task) {
    return <Navigate to="/my-tasks" replace />;
  }

  const board = boards.find(item => item.id === task.boardId);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-ecotrophy-blue transition-colors mb-6 group"
      >
        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <article className="premium-card p-8 bg-white/80 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <TaskStatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
          {board && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: board.color }} />
              {board.departmentName}
            </span>
          )}
        </div>

        <h2 className="text-3xl font-bold text-ecotrophy-navy mb-4">{task.title}</h2>
        <p className="text-slate-600 leading-7 mb-8">{task.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              <UserRound size={15} /> Owner
            </div>
            <p className="font-bold text-ecotrophy-navy">{task.ownerName}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              <Calendar size={15} /> Deadline
            </div>
            <p className="font-bold text-ecotrophy-navy">{task.deadline}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              <CheckSquare size={15} /> Board
            </div>
            <p className="font-bold text-ecotrophy-navy">{board?.title ?? task.boardId}</p>
          </div>
        </div>

        <section>
          <h3 className="text-lg font-bold text-ecotrophy-navy mb-4">Proof</h3>
          {task.proofUrls.length > 0 ? (
            <div className="space-y-3">
              {task.proofUrls.map(url => (
                <a key={url} href={url} className="flex items-center gap-2 text-sm font-bold text-ecotrophy-blue hover:text-ecotrophy-blueDark">
                  <LinkIcon size={16} />
                  {url}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm font-medium text-slate-400">No proof links attached yet.</p>
          )}
        </section>

        <div className="flex justify-end mt-8">
          <Button variant="secondary" onClick={() => navigate(`/boards/${task.boardId}`)}>Open Board</Button>
        </div>
      </article>
    </div>
  );
};
