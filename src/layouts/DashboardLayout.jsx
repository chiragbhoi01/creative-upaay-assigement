import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from '@hello-pangea/dnd';
import { moveTask } from '../features/tasksSlice';
import Column from '../components/Column';
import { Search, Filter, Plus } from 'lucide-react';
import AddTaskModal from '../components/AddTaskModal';
import TaskDetailsModal from '../components/TaskDetailsModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { tasks, columns, columnOrder } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPriority, setFilterPriority] = useState('All');
    const [selectedTaskId, setSelectedTaskId] = useState(null); 
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        dispatch(moveTask({
            source,
            destination,
            draggableId
        }));
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
      };

    const getFilteredTasks = (taskIds) => {
        return taskIds
            .map((id) => tasks[id])
            .filter((task) => {
                const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
                return matchesSearch && matchesPriority;
            });
    };

    return (
        <div className="h-full flex flex-col p-6">
             <header className="bg-white shadow mb-4">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
                    <h1 className="text-2xl font-bold text-gray-900">Project Overview</h1>
                    <p className="text-gray-500">Manage your tasks and track progress</p>
                </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-4">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
               

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                        />
                    </div>

                    <div className="relative">
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="appearance-none pl-10 pr-8 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        >
                            <option value="All">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>

                    <button
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm shadow-indigo-200"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus size={20} />
                        New Task
                    </button>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-6 overflow-x-auto pb-4 items-start h-full">
                    {columnOrder.map((columnId) => {
                        const column = columns[columnId];
                        const columnTasks = getFilteredTasks(column.taskIds);
                        return <Column key={column.id} column={column} tasks={columnTasks} setSelectedTaskId={setSelectedTaskId} />;
                    })}
                </div>
            </DragDropContext>
            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            {selectedTaskId && (
                <TaskDetailsModal
                    taskId={selectedTaskId}
                    isOpen={!!selectedTaskId}
                    onClose={() => setSelectedTaskId(null)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;