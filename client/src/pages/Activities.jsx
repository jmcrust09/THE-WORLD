import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

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
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error al cargar tareas', err);
      setTasks([]);
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
      const res = await axios.put(`/api/tasks/${task.id}`, { completed: !task.completed });
      setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
    } catch (err) {
      console.error('Error al actualizar tarea', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error al eliminar tarea', err);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalPoints = tasks.reduce((sum, task) => sum + (task.pointsEarned || 0), 0);

  return (
    <div className="tiles-grid">
      {/* TILE - ESTADÍSTICAS */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-chart-bar"></i> estadísticas
          </div>
        </div>
        <div className="tile-content">
          <div className="stat-group">
            <div className="stat-card-sm">
              <i className="fas fa-tasks"></i> tareas activas<br />
              <strong>{tasks.length}</strong>
            </div>
            <div className="stat-card-sm">
              <i className="fas fa-check-circle"></i> completadas<br />
              <strong>{completedTasks}</strong>
            </div>
            <div className="stat-card-sm">
              <i className="fas fa-coins"></i> puntos potenciales<br />
              <strong>{totalPoints}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* TILE - LISTA DE TAREAS */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-tasks"></i> bitácora diaria
          </div>
        </div>
        <div className="tile-content">
          {tasks.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px 0' }}>
              ✨ No hay actividades. Añade tu primera tarea ✨
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '8px' }}>
              {tasks.map((task) => (
                <div key={task.id} style={{
                  background: task.completed ? 'rgba(80, 60, 50, 0.3)' : 'transparent',
                  border: `1px dashed var(--separator)`,
                  padding: '8px',
                  borderRadius: '0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {task.day} · {task.schedule} · {task.category} · {task.priority} · +{task.pointsEarned || 0} pts
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => toggleComplete(task)}
                        style={{
                          background: task.completed ? 'var(--accent)' : 'var(--tile-dark)',
                          border: `1px solid var(--border-color)`,
                          color: task.completed ? 'var(--tile-bg)' : 'var(--text-muted)',
                          padding: '4px 8px',
                          fontSize: '11px',
                          cursor: 'pointer'
                        }}
                      >
                        {task.completed ? '✓' : '·'}
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        style={{
                          background: 'var(--tile-dark)',
                          border: `1px solid var(--border-color)`,
                          color: 'var(--text-muted)',
                          padding: '4px 8px',
                          fontSize: '11px',
                          cursor: 'pointer'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* TILE - NUEVA TAREA */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-plus"></i> nueva actividad
          </div>
        </div>
        <div className="tile-content">
          <form onSubmit={addTask} style={{ display: 'grid', gap: '10px' }}>
            <div>
              <label className="form-label">título</label>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Ej: Meditar 15 min"
                className="form-input"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label className="form-label">categoría</label>
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="form-select">
                  {categoryOptions.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">prioridad</label>
                <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)} className="form-select">
                  {priorityOptions.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label className="form-label">día</label>
                <select value={newDay} onChange={(e) => setNewDay(e.target.value)} className="form-select">
                  {dayOptions.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">horario</label>
                <select value={newSchedule} onChange={(e) => setNewSchedule(e.target.value)} className="form-select">
                  {scheduleOptions.map((hour) => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginTop: '10px' }}>
              <div className="badge" style={{ display: 'block', marginBottom: '10px' }}>
                <i className="fas fa-star"></i> valor estimado: <strong>{calculatePoints(newCategory, newPriority)} pts</strong>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Guardar actividad
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
