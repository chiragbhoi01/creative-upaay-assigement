import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const Column = ({ column, tasks }) => {
  return (
    <div className="flex flex-col w-80 shrink-0">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="font-bold text-gray-700 flex items-center gap-2">
          {column.title}
          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </h2>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex-1 bg-gray-100 rounded-xl p-3 min-h-[500px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-indigo-50 ring-2 ring-inset ring-indigo-200' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;