import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; // Make sure to npm install uuid

// Initial Helper: Load from Local Storage [cite: 44, 65]
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('kanbanState');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const initialState = loadState() || {
    tasks: {}, // Normalized state for easy updates (Subtasks, Logs, etc.)
    columns: {
        'todo': {
            id: 'todo',
            title: 'To Do',
            taskIds: [],
        },
        'in-progress': {
            id: 'in-progress',
            title: 'In Progress',
            taskIds: [],
        },
        'done': {
            id: 'done',
            title: 'Done',
            taskIds: [],
        },
    },
    columnOrder: ['todo', 'in-progress', 'done'],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // 1. Add Task (Level 1) [cite: 53]
        addTask: (state, action) => {
            const { title, description, priority, dueDate } = action.payload;
            const id = uuidv4();
            const newJob = {
                id,
                title,
                description,
                priority: priority || 'Low',
                dueDate: dueDate || null, // Level 2: Due Date [cite: 73]
                subtasks: [], // Level 2: Subtasks [cite: 74]
                activityLog: [ // Level 2: Activity Log [cite: 78]
                    { id: uuidv4(), text: `Task created`, timestamp: new Date().toISOString() }
                ]
            };

            state.tasks[id] = newJob;
            state.columns['todo'].taskIds.push(id);
        },

        // 2. Move Task / Drag & Drop Logic (Level 1 + Bonus) [cite: 68]
        moveTask: (state, action) => {
            const { source, destination, draggableId } = action.payload;

            const startColumn = state.columns[source.droppableId];
            const finishColumn = state.columns[destination.droppableId];

            // Moving within the same list
            if (startColumn === finishColumn) {
                const newTaskIds = Array.from(startColumn.taskIds);
                newTaskIds.splice(source.index, 1);
                newTaskIds.splice(destination.index, 0, draggableId);

                state.columns[source.droppableId].taskIds = newTaskIds;
                return;
            }

            // Moving from one list to another
            const startTaskIds = Array.from(startColumn.taskIds);
            startTaskIds.splice(source.index, 1);

            const finishTaskIds = Array.from(finishColumn.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);

            state.columns[source.droppableId].taskIds = startTaskIds;
            state.columns[destination.droppableId].taskIds = finishTaskIds;

            // Log the movement (Level 2: Activity Log) [cite: 78]
            const task = state.tasks[draggableId];
            task.activityLog.push({
                id: uuidv4(),
                text: `Moved to ${finishColumn.title}`,
                timestamp: new Date().toISOString()
            });
        },

        // 3. Add Subtask (Level 2) [cite: 74]
        addSubtask: (state, action) => {
            const { taskId, text } = action.payload;
            state.tasks[taskId].subtasks.push({
                id: uuidv4(),
                text,
                completed: false
            });
        },

        // 4. Toggle Subtask (Level 2)
        toggleSubtask: (state, action) => {
            const { taskId, subtaskId } = action.payload;
            const subtask = state.tasks[taskId].subtasks.find(s => s.id === subtaskId);
            if (subtask) subtask.completed = !subtask.completed;
        },

        // 5. Delete Task (Maintenance)
        deleteTask: (state, action) => {
            const { taskId, columnId } = action.payload;
            state.columns[columnId].taskIds = state.columns[columnId].taskIds.filter(id => id !== taskId);
            delete state.tasks[taskId];
        }
    },
});

export const { addTask, moveTask, addSubtask, toggleSubtask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;