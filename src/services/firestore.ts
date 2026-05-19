import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where, 
  onSnapshot,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import type { Department, Board, Task, Blocker, DailyReview } from '../types';

// Generic service to handle Firestore operations
export const firestoreService = {
  // Departments
  async getDepartments() {
    const q = query(collection(db, 'departments'), orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Department));
  },

  // Boards
  async getBoardsByDepartment(deptId: string) {
    const q = query(collection(db, 'boards'), where('departmentId', '==', deptId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Board));
  },

  async getBoard(boardId: string) {
    const docRef = doc(db, 'boards', boardId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Board;
    }
    return null;
  },

  // Tasks
  subscribeToTasks(boardId: string, callback: (tasks: Task[]) => void) {
    const q = query(collection(db, 'tasks'), where('boardId', '==', boardId), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
      callback(tasks);
    });
  },

  async createTask(task: Omit<Task, 'id'>) {
    const newDocRef = doc(collection(db, 'tasks'));
    await setDoc(newDocRef, {
      ...task,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return newDocRef.id;
  },

  async updateTask(taskId: string, updates: Partial<Task>) {
    const docRef = doc(db, 'tasks', taskId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  },

  // Blockers
  async getBlockers() {
    const q = query(collection(db, 'blockers'), where('status', '==', 'Active'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Blocker));
  },

  // Daily Reviews
  async getDailyReview(date: string) {
    const docRef = doc(db, 'dailyReviews', date);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as DailyReview;
    }
    return null;
  },

  async saveDailyReview(date: string, review: Omit<DailyReview, 'id' | 'date'>) {
    const docRef = doc(db, 'dailyReviews', date);
    await setDoc(docRef, {
      ...review,
      date,
      updatedAt: Timestamp.now()
    }, { merge: true });
  }
};
