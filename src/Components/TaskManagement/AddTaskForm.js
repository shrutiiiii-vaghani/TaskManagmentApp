import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(newTask);
    setNewTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={{ padding: '7px' }}
      />
      <button type="submit" style={{ padding: '5px',marginLeft: '6px',fontSize:'15px',fontWeight:"600" }}>Add Task</button>
    </form>
  );
};

export default AddTaskForm;
