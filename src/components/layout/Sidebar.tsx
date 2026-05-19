import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  CheckSquare, 
  AlertCircle, 
  Calendar, 
  Users, 
  Settings,
  Circle
} from 'lucide-react';
import { departments } from '../../data/mockData';
import { useAuth } from '../../context/useAuth';
import { LogOut } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Layers, label: 'Boards', path: '/boards' },
  { icon: CheckSquare, label: 'My Tasks', path: '/my-tasks' },
  { icon: AlertCircle, label: 'Blockers', path: '/blockers' },
  { icon: Calendar, label: 'Daily Review', path: '/daily-review' },
  { icon: Users, label: 'Team', path: '/team' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { user, logout } = useAuth();

  return (
    <aside 
      className={`h-screen sidebar-glass flex flex-col fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out ${isHovered ? 'w-64' : 'w-20'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`p-6 mb-6 flex items-center ${isHovered ? 'justify-start' : 'justify-center'}`}>
        <div className="w-10 h-10 bg-gradient-to-br from-ecotrophy-blue to-ecotrophy-lime rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,102,255,0.4)]">
          <span className="text-white font-extrabold text-xl shadow-sm">E</span>
        </div>
        {isHovered && (
          <h1 className="ml-3 text-2xl font-extrabold tracking-tight whitespace-nowrap overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-ecotrophy-navy to-ecotrophy-blue">
            Execution
          </h1>
        )}
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center h-12 rounded-2xl transition-all duration-300 group relative font-semibold
              ${isActive 
                ? 'bg-ecotrophy-blue text-white shadow-punchy' 
                : 'text-slate-500 hover:bg-white hover:text-ecotrophy-blue hover:shadow-sm'}
              ${isHovered ? 'px-4 gap-3' : 'justify-center'}
            `}
          >
            <item.icon size={22} className="shrink-0" />
            {isHovered && <span className="whitespace-nowrap">{item.label}</span>}
            {!isHovered && (
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-ecotrophy-navy text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}

        {isHovered && (
          <div className="mt-8 mb-3 px-4">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Active Boards</p>
          </div>
        )}

        {departments.map((dept) => (
          <NavLink
            key={dept.id}
            to={`/boards/board-${dept.id}`}
            className={({ isActive }) => `
              flex items-center h-12 rounded-2xl transition-all duration-300 group relative font-semibold
              ${isActive 
                ? 'bg-white text-ecotrophy-navy shadow-md ring-1 ring-slate-100' 
                : 'text-slate-500 hover:bg-white hover:text-ecotrophy-navy hover:shadow-sm'}
              ${isHovered ? 'px-4 gap-3' : 'justify-center'}
            `}
          >
            {({ isActive }) => (
              <>
                <Circle size={12} fill={dept.color} stroke="none" className={`shrink-0 ${isActive ? 'drop-shadow-md' : ''}`} />
                {isHovered && <span className="whitespace-nowrap">{dept.name}</span>}
                {!isHovered && (
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-ecotrophy-navy text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                    {dept.name}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className={`p-4 mt-auto border-t border-white/40 bg-white/10`}>
        <div className={`flex items-center group relative ${isHovered ? 'gap-3 px-3 py-2' : 'justify-center'}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-white border-2 border-white flex items-center justify-center font-extrabold text-sm shrink-0 text-ecotrophy-navy shadow-sm">
            {user?.email?.charAt(0).toUpperCase() || 'F'}
          </div>
          {isHovered && (
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-sm font-bold text-ecotrophy-navy truncate">
                {user?.email?.split('@')[0] || 'Founder'}
              </span>
              <button 
                onClick={() => logout()}
                className="text-xs text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 mt-0.5 transition-colors"
              >
                <LogOut size={12} />
                Sign Out
              </button>
            </div>
          )}
          {!isHovered && (
             <button 
                onClick={() => logout()}
                className="absolute left-full ml-4 px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 flex items-center gap-1 shadow-xl"
             >
               <LogOut size={12} />
               Sign Out
             </button>
          )}
        </div>
      </div>
    </aside>
  );
};
