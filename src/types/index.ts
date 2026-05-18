// Core types for Ecotrophy Execution OS
export type TaskStatus = 'To Do' | 'Doing' | 'Done';
export type Priority = 'High' | 'Medium' | 'Low';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  photoUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface Board {
  id: string;
  title: string;
  departmentId: string;
  departmentName: string;
  color: string;
  metrics: {
    totalTasks: number;
    done: number;
    blocked: number;
    overdue: number;
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  boardId: string;
  departmentId: string;
  ownerId: string;
  ownerName: string;
  priority: Priority;
  deadline: string;
  status: TaskStatus;
  blocker?: string;
  proofUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Blocker {
  id: string;
  taskId: string;
  taskTitle: string;
  description: string;
  status: 'Active' | 'Resolved';
  createdAt: string;
  ownerName: string;
}

export interface DailyReview {
  id: string;
  date: string;
  userId: string;
  wins: string[];
  challenges: string[];
  tomorrowFocus: string[];
}
