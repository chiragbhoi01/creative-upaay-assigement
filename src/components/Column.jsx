import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

const Column = ({ column, tasks, setSelectedTaskId, openAddTaskModal }) => {
    const getHeaderStyle = (id) => {
        switch (id) {
            case 'todo':
                return { dot: 'bg-[#5030E5]', border: 'border-[#5030E5]' };
            case 'on-progress':
                return { dot: 'bg-[#FFA500]', border: 'border-[#FFA500]' };
            case 'done':
                return { dot: 'bg-[#8BC48A]', border: 'border-[#8BC48A]' };
            default:
                return { dot: 'bg-gray-400', border: 'border-gray-400' };
        }
    };

    const { dot, border } = getHeaderStyle(column.id);

    return (
        <div className="flex flex-col w-80 shrink-0">
            <div className={`flex items-center justify-between mb-4 px-1 pb-3 border-b-[3px] ${border}`}>
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${dot}`}></span>
                    <h2 className="font-medium text-gray-800">
                        {column.title}
                    </h2>
                    <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
                        {tasks.length}
                    </span>
                </div>
                {column.id === 'todo' && (
                    <button onClick={openAddTaskModal} className="text-white bg-[#5030E5] rounded-md p-1 hover:bg-[#4026B3]">
                        <Plus size={16} />
                    </button>
                )}
            </div>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 bg-gray-50/30 rounded-lg p-2 min-h-[500px] transition-colors duration-300 ${snapshot.isDraggingOver ? 'bg-indigo-50' : ''}`}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} onClick={() => setSelectedTaskId(task.id)} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
