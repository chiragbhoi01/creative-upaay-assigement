import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Calendar, CheckSquare, Clock } from 'lucide-react';

const TaskCard = ({ task, index }) => {
    const completedSubtasks = task.subtasks?.filter(s => s.completed).length || 0;
    const totalSubtasks = task.subtasks?.length || 0;

    const getPriorityColor = (p) => {
        switch (p?.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-700 border-red-200';
            case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
            default: return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3 group hover:shadow-md transition-shadow ${snapshot.isDragging ? 'shadow-lg ring-2 ring-indigo-500 rotate-2' : ''
                        }`}
                    style={provided.draggableProps.style}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                        </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{task.description}</p>

                    <div className="flex items-center justify-between text-gray-400 text-xs mt-3 pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-4">
                            {task.dueDate && (
                                <div className={`flex items-center gap-1 ${new Date(task.dueDate) < new Date() ? 'text-red-500 font-medium' : ''}`}>
                                    <Clock size={14} />
                                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                </div>
                            )}

                            {totalSubtasks > 0 && (
                                <div className="flex items-center gap-1">
                                    <CheckSquare size={14} />
                                    <span>{completedSubtasks}/{totalSubtasks}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;