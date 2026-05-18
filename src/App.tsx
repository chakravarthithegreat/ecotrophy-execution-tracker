import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Boards } from './pages/Boards';
import { BoardDetail } from './pages/BoardDetail';
import { MyTasks } from './pages/MyTasks';
import { Blockers } from './pages/Blockers';
import { DailyReview } from './pages/DailyReview';
import { Team } from './pages/Team';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { AppShell } from './components/layout/AppShell';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/boards/:boardId" element={<BoardDetail />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/blockers" element={<Blockers />} />
            <Route path="/daily-review" element={<DailyReview />} />
            <Route path="/team" element={<Team />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Redirect root to dashboard if logged in */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>

        {/* Catch all redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
