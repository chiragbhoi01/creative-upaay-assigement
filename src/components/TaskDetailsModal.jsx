import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubtask, toggleSubtask, deleteTask } from '../features/tasksSlice';
import { X, Calendar, CheckSquare, Clock, Trash2, Send } from 'lucide-react';

const TaskDetailsModal = ({ taskId, onClose }) => {
  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.tasks[taskId]);
  const [newSubtask, setNewSubtask] = useState('');

  if (!task) return null; // Safety check

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    dispatch(addSubtask({ taskId, text: newSubtask }));
    setNewSubtask('');
  };

  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      // We need to find which column this task is in to delete it cleanly
      // For now, we will just close the modal. 
      // Ideally, pass the columnId to the modal or store it in the task.
      // Dispatch delete action here if you implemented it fully.
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 bg-gray-50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${
                task.priority === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                task.priority === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                'bg-blue-100 text-blue-700 border-blue-200'
              }`}>
                {task.priority} Priority
              </span>
              {task.dueDate && (
                <span className="flex items-center gap-1 text-xs text-gray-500 font-medium bg-white px-2 py-0.5 rounded-full border border-gray-200">
                  <Calendar size={12} />
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Description */}
          <section>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {task.description || "No description provided."}
            </p>
          </section>

          {/* Subtasks Section (Level 2 Requirement) */}
          <section>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckSquare size={16} /> Subtasks
            </h3>
            
            <div className="space-y-2 mb-4">
              {task.subtasks.map(subtask => (
                <div key={subtask.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => dispatch(toggleSubtask({ taskId, subtaskId: subtask.id }))}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className={`flex-1 text-sm ${subtask.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {subtask.text}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddSubtask} className="flex gap-2">
              <input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                placeholder="Add a subtask..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button 
                type="submit"
                disabled={!newSubtask.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </section>

          {/* Activity Log Section (Level 2 Requirement) */}
          <section>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Clock size={16} /> Activity Log
            </h3>
            <div className="border-l-2 border-gray-200 ml-2 space-y-4 py-2">
              {task.activityLog?.slice().reverse().map(log => ( // Show newest first
                <div key={log.id} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gray-200 border-2 border-white"></div>
                  <p className="text-sm text-gray-800">{log.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={handleDeleteTask}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Trash2 size={16} />
            Delete Task
          </button>
        </div>

      </div>
    </div>
  );
};

export default TaskDetailsModal;