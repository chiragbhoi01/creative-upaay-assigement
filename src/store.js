import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import tasksReducer, { addTask, moveTask, addSubtask, toggleSubtask, deleteTask } from './features/tasksSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(addTask, moveTask, addSubtask, toggleSubtask, deleteTask),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    const tasksState = state.tasks;
    
    try {
      const serializedState = JSON.stringify(tasksState);
      localStorage.setItem('kanbanState', serializedState);
    } catch (err) {
      console.error("Could not save state to localStorage", err);
    }
  },
});

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});