import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import WindowPanel from '../components/WindowPanel';

const categoryOptions = [
  { value: 'Deporte', label: 'Deporte' },
  { value: 'Aprendizaje', label: 'Aprendizaje' },
  { value: 'Trabajo', label: 'Trabajo' },
  { value: 'Bienestar', label: 'Bienestar' },
  { value: 'Creatividad', label: 'Creatividad' },
  { value: 'Hogar', label: 'Hogar' }
];

const priorityOptions = [
  { value: 'Indispensable', label: 'Indispensable' },
  { value: 'Necesaria', label: 'Necesaria' },
  { value: 'Deseable', label: 'Deseable' }
];

const scheduleOptions = ['Mañana', 'Tarde', 'Noche'];
const dayOptions = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function calculatePoints(category, priority) {
  const categoryBase = {
    Deporte: 220,
    Aprendizaje: 180,
    Trabajo: 240,
    Bienestar: 130,
    Creatividad: 170,
    Hogar: 140
  };

  const priorityFactor = {
    Indispensable: 1.4,
    Necesaria: 1.1,
    Deseable: 0.85
  };

  return Math.round((categoryBase[category] || 130) * (priorityFactor[priority] || 1));
}

export default function Activities() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Aprendizaje');
  const [newPriority, setNewPriority] = useState('Necesaria');
  const [newDay, setNewDay] = useState('Lunes');
  const [newSchedule, setNewSchedule] = useState('Mañana');

  useEffect(() => {
    if (user) fetchTasks();
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
    const pointsEarned = calculatePoints(newCategory, newPriority);
    try {
      const res = await axios.post('/api/tasks', {
        title: newTaskTitle,
        category: newCategory,
        priority: newPriority,
        day: newDay,
        schedule: newSchedule,
        pointsEarned
      });
      setTasks([res.data, ...tasks]);
      setNewTaskTitle('');
    } catch (err) {
      console.error('Error al agregar tarea', err);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await axios.put(`/api/tasks/${task._id}`, { completed: !task.completed });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error('Error al actualizar tarea', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Error al eliminar tarea', err);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalPoints = tasks.reduce((sum, task) => sum + (task.pointsEarned || 0), 0);

  return (
    <div className="grid gap-6">
      <WindowPanel title="actividades" subtitle="panel de control" icon="📝" extra={`${completedTasks}/${tasks.length} completadas`}>
        <div className="section-grid cols-2">
          <div className="tile-card">
            <div className="panel-label">puntos potenciales</div>
            <div className="panel-value">{totalPoints}</div>
            <div className="panel-note">Suma de todos los valores actuales de las tareas.</div>
          </div>
          <div className="tile-card">
            <div className="panel-label">tareas activas</div>
            <div className="panel-value">{tasks.length}</div>
            <div className="panel-note">Registra lo que debes completar hoy y en los próximos días.</div>
          </div>
        </div>
      </WindowPanel>

      <WindowPanel title="lista" subtitle="bitácora diaria" icon="▣">
        <div className="grid gap-4">
          {tasks.length === 0 ? (
            <div className="text-center text-grey py-10 text-sm">✨ No hay actividades. Añade tu primera tarea para activar el dashboard. ✨</div>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className={`task-row ${task.completed ? 'completed' : ''}`}>
                <div className="task-header">
                  <div className="task-title">{task.title}</div>
                  <div className="task-meta">
                    <span>{task.day}</span>
                    <span>{task.schedule}</span>
                    <span>{task.category}</span>
                    <span>{task.priority}</span>
                    <span>+{task.pointsEarned || 0} pts</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="inline-flex items-center gap-2 text-sm text-grey">
                    <input type="checkbox" className="accent-blue" checked={task.completed} onChange={() => toggleComplete(task)} />
                    {task.completed ? 'Completada' : 'Marcar como completada'}
                  </label>
                  <button onClick={() => deleteTask(task._id)} className="action-button">Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </WindowPanel>

      <WindowPanel title="nueva tarea" subtitle="añadir actividad" icon="＋">
        <form onSubmit={addTask} className="grid gap-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Ej: Meditar 15 min"
            className="w-full p-3 rounded-2xl border border-beige bg-white focus:outline-none focus:ring-1 focus:ring-blue"
            required
          />

          <div className="grid gap-4 md:grid-cols-2">
            <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="rounded-2xl border border-beige p-3 bg-white">
              {categoryOptions.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)} className="rounded-2xl border border-beige p-3 bg-white">
              {priorityOptions.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <select value={newDay} onChange={(e) => setNewDay(e.target.value)} className="rounded-2xl border border-beige p-3 bg-white">
              {dayOptions.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select value={newSchedule} onChange={(e) => setNewSchedule(e.target.value)} className="rounded-2xl border border-beige p-3 bg-white">
              {scheduleOptions.map((hour) => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <span className="info-badge">valor estimado: {calculatePoints(newCategory, newPriority)} pts</span>
            <button type="submit" className="action-button">Guardar actividad</button>
            <button
              type="button"
              className="action-button"
              onClick={() => {
                setNewTaskTitle('');
                setNewCategory('Aprendizaje');
                setNewPriority('Necesaria');
                setNewDay('Lunes');
                setNewSchedule('Mañana');
              }}
            >
              Limpiar
            </button>
          </div>
        </form>
      </WindowPanel>
    </div>
  );
}
