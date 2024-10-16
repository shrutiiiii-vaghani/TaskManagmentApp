import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskDetailsModal from './TaskDetailsModal';

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    // Retrieve tasks from localStorage or use default tasks
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];
  });

  useEffect(() => {
    // Store tasks in localStorage whenever they change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, title: newTask, completed: false }]);
  };

  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      height: '100vh', 
      overflow: 'hidden', 
      backgroundImage: 'url("https://images.pexels.com/photos/19566214/pexels-photo-19566214/free-photo-of-milkyway-photography-taken-in-spiti-valley-himachal-pradesh.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat' 
    }}>
      <h2 style={{ marginBottom: '20px', color: '#fff' }}>Task Management</h2>
      <AddTaskForm onAddTask={handleAddTask} />
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '20px', 
        marginTop: '20px', 
        width: '100%', 
        padding: '0 20px', 
        boxSizing: 'border-box', 
      }}>
        {tasks.map(task => (
          <div key={task.id} style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden', 
          }}>
            <h3 style={{ margin: '0' }}>{task.title} {task.completed ? "(Completed)" : ""}</h3>
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => handleCompleteTask(task.id)} style={{ marginRight: '10px' }}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
            <TaskDetailsModal task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
