import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
    tasks: {},
    columns: {
        'todo': {
            id: 'todo',
            title: 'To Do',
            taskIds: [],
        },
        'on-progress': {
            id: 'on-progress',
            title: 'On Progress',
            taskIds: [],
        },
        'done': {
            id: 'done',
            title: 'Done',
            taskIds: [],
        },
    },
    columnOrder: ['todo', 'on-progress', 'done'],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const { title, description, priority, dueDate } = action.payload;
            const id = uuidv4();
            const newJob = {
                id,
                title,
                description,
                priority: priority || 'Low',
                dueDate: dueDate || null,
                subtasks: [],
                activityLog: [
                    { id: uuidv4(), text: `Task created`, timestamp: new Date().toISOString() }
                ]
            };

            state.tasks[id] = newJob;
            state.columns['todo'].taskIds.push(id);
        },
        moveTask: (state, action) => {
            const { source, destination, draggableId } = action.payload;
            const startColumn = state.columns[source.droppableId];
            const finishColumn = state.columns[destination.droppableId];

            if (startColumn === finishColumn) {
                const newTaskIds = Array.from(startColumn.taskIds);
                newTaskIds.splice(source.index, 1);
                newTaskIds.splice(destination.index, 0, draggableId);
                state.columns[source.droppableId].taskIds = newTaskIds;
                return;
            }

            const startTaskIds = Array.from(startColumn.taskIds);
            startTaskIds.splice(source.index, 1);
            const finishTaskIds = Array.from(finishColumn.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);

            state.columns[source.droppableId].taskIds = startTaskIds;
            state.columns[destination.droppableId].taskIds = finishTaskIds;
            
            const task = state.tasks[draggableId];
            task.activityLog.push({
                id: uuidv4(),
                text: `Moved to ${finishColumn.title}`,
                timestamp: new Date().toISOString()
            });
        },
        addSubtask: (state, action) => {
            const { taskId, text } = action.payload;
            state.tasks[taskId].subtasks.push({ id: uuidv4(), text, completed: false });
        },
        toggleSubtask: (state, action) => {
            const { taskId, subtaskId } = action.payload;
            const subtask = state.tasks[taskId].subtasks.find(s => s.id === subtaskId);
            if (subtask) subtask.completed = !subtask.completed;
        },
        deleteTask: (state, action) => {
            const { taskId, columnId } = action.payload;
            state.columns[columnId].taskIds = state.columns[columnId].taskIds.filter(id => id !== taskId);
            delete state.tasks[taskId];
        }
    },
});

export const { addTask, moveTask, addSubtask, toggleSubtask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;