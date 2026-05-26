import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Activities() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Cargar tareas al montar el componente
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error al cargar tareas', err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      const res = await axios.post('/api/tasks', { title: newTaskTitle });
      setTasks([res.data, ...tasks]);
      setNewTaskTitle('');
      setShowAddForm(false);
    } catch (err) {
      console.error('Error al agregar tarea', err);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await axios.put(`/api/tasks/${task._id}`, { completed: !task.completed });
      setTasks(tasks.map(t => t._id === task._id ? res.data : t));
    } catch (err) {
      console.error('Error al actualizar tarea', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error al eliminar tarea', err);
    }
  };

  return (
    <div className="p-4 bg-[rgba(248,244,239,0.5)] rounded-2xl border border-beige">
      <h2 className="text-dark font-medium mb-4 flex items-center gap-2">
        <span>📝</span> Bitácora de Actividades
      </h2>

      <div className="space-y-3">
        {/* Lista dinámica de tareas */}
        {tasks.length === 0 && (
          <div className="text-center text-grey py-6 text-sm">
            ✨ No hay actividades. Añade la primera ✨
          </div>
        )}
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center p-3 bg-bg border border-beige rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
              />
              <span className={task.completed ? 'line-through text-grey' : ''}>
                {task.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Puntos: si tu modelo tiene puntos, muestra; si no, un placeholder o nada */}
              <span className="text-sm text-blue">+100 pts</span>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-grey hover:text-red-500 transition-colors"
                title="Eliminar"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        {/* Botón para añadir nueva actividad */}
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-3 border border-dashed border-beige2 rounded-xl text-grey hover:bg-[rgba(227,221,212,0.3)] transition-colors"
          >
            + Añadir actividad
          </button>
        ) : (
          <form onSubmit={addTask} className="mt-2 flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Ej: Leer 30 min"
              className="flex-1 p-2 border border-beige rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-blue"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue text-white rounded-xl hover:bg-blue-600 transition"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-beige rounded-xl hover:bg-[rgba(227,221,212,0.3)]"
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}