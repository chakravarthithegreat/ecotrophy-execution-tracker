import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Flag, Layers, UserRound } from 'lucide-react';
import { boards, currentUser } from '../data/mockData';
import { Button } from '../components/ui/Button';

export const NewTask: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-ecotrophy-blue transition-colors mb-6 group"
      >
        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <header className="mb-8">
        <h2 className="text-3xl font-bold text-ecotrophy-navy">Create Task</h2>
        <p className="text-slate-500 font-medium">Draft a Sprint 1 execution task for a department board.</p>
      </header>

      <form className="premium-card p-8 bg-white/80 backdrop-blur-md space-y-6" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-2">
          <label className="block text-sm font-extrabold text-ecotrophy-navy tracking-wide">Task Title</label>
          <input className="input-field" placeholder="Name the execution outcome" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-extrabold text-ecotrophy-navy tracking-wide">Description</label>
          <textarea className="input-field min-h-[120px] resize-none" placeholder="Add context, acceptance criteria, and proof expected" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-extrabold text-ecotrophy-navy tracking-wide">
              <Layers size={16} /> Board
            </span>
            <select className="input-field">
              {boards.map(board => (
                <option key={board.id} value={board.id}>{board.title}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-extrabold text-ecotrophy-navy tracking-wide">
              <Flag size={16} /> Priority
            </span>
            <select className="input-field">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-extrabold text-ecotrophy-navy tracking-wide">
              <Calendar size={16} /> Deadline
            </span>
            <input type="date" className="input-field" defaultValue="2026-05-20" />
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-extrabold text-ecotrophy-navy tracking-wide">
              <UserRound size={16} /> Owner
            </span>
            <input className="input-field" defaultValue={currentUser.name} />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit">Save Draft</Button>
        </div>
      </form>
    </div>
  );
};
