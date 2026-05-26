import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('/api/tasks');
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const res = await axios.post('/api/tasks', { title: newTitle });
    setTasks([res.data, ...tasks]);
    setNewTitle('');
  };

  const toggleComplete = async (task) => {
    const updated = await axios.put(`/api/tasks/${task._id}`, { completed: !task.completed });
    setTasks(tasks.map(t => t._id === task._id ? updated.data : t));
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div>
      <form onSubmit={addTask}>
        <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Nueva actividad" />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task)} />
            {task.title}
            <button onClick={() => deleteTask(task._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}