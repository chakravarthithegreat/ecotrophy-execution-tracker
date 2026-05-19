import type { Board, Department, Task, Blocker, User } from '../types/index';

const MOCK_CREATED_AT = '2026-05-19T09:00:00.000Z';
const MOCK_UPDATED_AT = '2026-05-19T09:00:00.000Z';

export const currentUser: User = {
  id: 'user-1',
  name: 'Founder',
  email: 'founder@ecotrophy.com',
  role: 'Administrator',
};

export const departments: Department[] = [
  { id: 'founder', name: 'Founder Command', color: '#0047AB' },
  { id: 'marketing', name: 'Marketing', color: '#FF5733' },
  { id: 'personal-brand', name: 'Personal Brand', color: '#C70039' },
  { id: 'sales', name: 'Sales', color: '#2ECC71' },
  { id: 'operations', name: 'Operations', color: '#9B59B6' },
  { id: 'rd', name: 'R&D', color: '#F1C40F' },
  { id: 'finance', name: 'Finance', color: '#1ABC9C' },
  { id: 'hr', name: 'HR', color: '#E67E22' },
  { id: 'management', name: 'Management', color: '#34495E' },
];

export const boards: Board[] = departments.map(dept => ({
  id: `board-${dept.id}`,
  title: dept.name,
  departmentId: dept.id,
  departmentName: dept.name,
  color: dept.color,
  metrics: {
    totalTasks: 12,
    done: 8,
    blocked: 1,
    overdue: 2,
  },
}));

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Review Q3 Execution Plan',
    description: 'Go through the operational milestones for the next quarter.',
    boardId: 'board-founder',
    departmentId: 'founder',
    ownerId: 'user-1',
    ownerName: 'Founder',
    priority: 'High',
    deadline: '2026-05-20',
    status: 'Doing',
    createdAt: MOCK_CREATED_AT,
    updatedAt: MOCK_UPDATED_AT,
    proofUrls: [],
  },
  {
    id: 'task-2',
    title: 'Finalize Marketing Budget',
    description: 'Allocate funds for social media campaigns.',
    boardId: 'board-marketing',
    departmentId: 'marketing',
    ownerId: 'user-2',
    ownerName: 'Marketing Head',
    priority: 'Medium',
    deadline: '2026-05-22',
    status: 'To Do',
    blocker: 'Awaiting final campaign budget approval.',
    createdAt: MOCK_CREATED_AT,
    updatedAt: MOCK_UPDATED_AT,
    proofUrls: [],
  },
  {
    id: 'task-3',
    title: 'Fix Production Bug #402',
    description: 'Resolved the memory leak in the core engine.',
    boardId: 'board-operations',
    departmentId: 'operations',
    ownerId: 'user-3',
    ownerName: 'Lead Engineer',
    priority: 'High',
    deadline: '2026-05-18',
    status: 'Done',
    createdAt: MOCK_CREATED_AT,
    updatedAt: MOCK_UPDATED_AT,
    proofUrls: ['https://example.com/proof.png'],
  }
];

export const mockBlockers: Blocker[] = [
  {
    id: 'blocker-1',
    taskId: 'task-2',
    taskTitle: 'Finalize Marketing Budget',
    description: 'Awaiting final campaign budget approval.',
    status: 'Active',
    createdAt: MOCK_CREATED_AT,
    ownerName: 'Marketing Head',
  }
];
