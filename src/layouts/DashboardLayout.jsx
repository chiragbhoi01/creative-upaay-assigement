import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from '@hello-pangea/dnd';
import { moveTask } from '../features/tasksSlice';
import Column from '../components/Column';
import AddTaskModal from '../components/AddTaskModal';
import TaskDetailsModal from '../components/TaskDetailsModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, Settings, LogOut, MoreHorizontal, Home, Columns, Plus, Filter, Users, Calendar } from 'lucide-react';

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
    const dispatch = useDispatch();
    const { tasks, columns, columnOrder } = useSelector((state) => state.tasks);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPriority, setFilterPriority] = useState('All');

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }
        dispatch(moveTask({ source, destination, draggableId }));
    };

    const getFilteredTasks = (columnId) => {
        const column = columns[columnId];
        return column.taskIds
            .map(taskId => tasks[taskId])
            .filter(task => {
                if (!task) return false;
                const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
                return matchesSearch && matchesPriority;
            });
    };

    const openAddTaskModal = () => setIsModalOpen(true);

    return (
        <div className="h-screen w-full flex bg-gray-50/50">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full">
                <header className="flex items-center justify-between p-6 bg-white border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">Mobile App</h1>
                    </div>
                    <div className="flex items-center gap-3">
                         <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-3 py-2 w-48 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                            />
                        </div>
                        <div className="relative">
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="appearance-none pl-9 pr-8 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
                            >
                                <option value="All">All Priorities</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                        <button className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50">
                            <Calendar size={16} /> Today
                        </button>
                        <button className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50">
                            <Users size={16} /> Share
                        </button>
                         <button
                            onClick={openAddTaskModal}
                            className="flex items-center gap-2 bg-[#5030E5] text-white px-3 py-2 rounded-lg hover:bg-[#4026B3] transition-colors text-sm font-semibold"
                        >
                            <Plus size={18} />
                        </button>
                        <div className="flex items-center gap-3 border-l border-gray-200 pl-4 ml-2">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-800 truncate max-w-[120px]">
                                    {user.displayName || 'Anonymous User'}
                                </p>
                                <p className="text-xs text-gray-500 truncate max-w-[120px]">{user.email}</p>
                            </div>
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`}
                                alt="User avatar"
                            />
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
                                    tasks={getFilteredTasks(columnId)}
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