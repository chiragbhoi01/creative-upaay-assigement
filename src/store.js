import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
