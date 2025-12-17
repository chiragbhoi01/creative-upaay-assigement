import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from '@hello-pangea/dnd';
import { moveTask } from '../features/tasksSlice';
import Column from '../components/Column';
import { Search, Bell, ChevronDown, Settings, LogOut, MoreHorizontal, Home, Columns, Plus } from 'lucide-react';
import AddTaskModal from '../components/AddTaskModal';
import TaskDetailsModal from '../components/TaskDetailsModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="w-64 bg-white flex flex-col shrink-0 border-r border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800">Creative Upaay</h1>
                <p className="text-sm text-gray-500">TaskBoard</p>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Home size={20} />
                    <span>Home</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Columns size={20} />
                    <span>Boards</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Settings size={20} />
                    <span>Settings</span>
                </a>
                <div className="px-4 pt-6 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    My Projects
                </div>
                <a href="#" className="flex items-center justify-between gap-3 px-4 py-2 text-purple-700 bg-purple-50 rounded-lg font-semibold">
                    <span className='truncate'>Mobile App</span>
                    <MoreHorizontal size={20} />
                </a>
            </nav>
            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

const DashboardLayout = () => {
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { tasks, columns, columnOrder } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }
        dispatch(moveTask({ source, destination, draggableId }));
    };

    const getTasksByColumn = (columnId) => {
        const column = columns[columnId];
        return column.taskIds.map(taskId => tasks[taskId]).filter(Boolean);
    };

    const openAddTaskModal = () => setIsModalOpen(true);

    return (
        <div className="h-screen w-full flex bg-gray-50/50">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full">
                <header className="flex items-center justify-between p-6 bg-white border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold text-gray-800">Mobile App</h1>
                        <button
                            onClick={openAddTaskModal}
                            className="flex items-center gap-2 bg-[#5030E5] text-white px-3 py-1.5 rounded-lg hover:bg-[#4026B3] transition-colors text-sm font-medium"
                        >
                            <Plus size={18} />
                            Add New
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-gray-800">
                            <Search size={22} />
                        </button>
                        <button className="text-gray-500 hover:text-gray-800">
                            <Bell size={22} />
                        </button>
                        <div className="flex items-center gap-2">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-8 h-8 rounded-full" />
                            <div>
                                <h4 className="font-semibold text-sm text-gray-700">{user?.name || 'User'}</h4>
                                <p className='text-xs text-gray-500'>UX Designer</p>
                            </div>
                            <button className="text-gray-500">
                                <ChevronDown size={20} />
                            </button>
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-x-auto p-6">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="flex gap-6 items-start h-full">
                            {columnOrder.map((columnId) => (
                                <Column
                                    key={columnId}
                                    column={columns[columnId]}
                                    tasks={getTasksByColumn(columnId)}
                                    setSelectedTaskId={setSelectedTaskId}
                                    openAddTaskModal={openAddTaskModal}
                                />
                            ))}
                        </div>
                    </DragDropContext>
                </div>
            </main>
            <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
