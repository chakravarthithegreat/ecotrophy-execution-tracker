import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Outlet } from 'react-router-dom';

export const AppShell: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar />
      <div className="pl-20 flex flex-col min-h-screen transition-all duration-300">
        <Topbar />
        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
