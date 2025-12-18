import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { MessageSquare, Folder } from 'lucide-react';

const avatar1 = "https://i.pravatar.cc/150?img=1";
const avatar2 = "https://i.pravatar.cc/150?img=2";
const avatar3 = "https://i.pravatar.cc/150?img=3";

const TaskCard = ({ task, index, onClick }) => {
    const getPriorityStyle = (p) => {
        switch (p?.toLowerCase()) {
            case 'high':
                return 'bg-red-100 text-red-600';
            case 'completed':
                return 'bg-green-100 text-green-700';
            case 'low':
            default:
                return 'bg-orange-100 text-orange-600';
        }
    };

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={onClick}
                    className={`bg-white p-4 rounded-xl border border-transparent hover:border-gray-300 cursor-pointer mb-3 group transition-all ${snapshot.isDragging ? 'shadow-lg ring-2 ring-indigo-400 rotate-1' : 'shadow-sm'}`}
                    style={provided.draggableProps.style}
                >
                    <div className="flex justify-between items-start mb-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${getPriorityStyle(task.priority)}`}>
                            {task.priority}
                        </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">{task.title}</h3>
                    {task.description && (
                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{task.description}</p>
                    )}
                    <div className="flex items-center justify-between text-gray-500 text-xs mt-4">
                        <div className="flex -space-x-2">
                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={avatar1} alt="User 1" />
                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={avatar2} alt="User 2" />
                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={avatar3} alt="User 3" />
                        </div>
                        <div className="flex items-center gap-4 font-medium">
                            <div className="flex items-center gap-1.5">
                                <MessageSquare size={16} className='text-gray-400' />
                                <span>12 comments</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Folder size={16} className='text-gray-400' />
                                <span>0 files</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;