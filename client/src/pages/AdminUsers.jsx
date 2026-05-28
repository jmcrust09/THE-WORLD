import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = API_BASE;

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/admin/users', {
        headers: { 'x-auth-token': token }
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdmin = async (userId, currentStatus) => {
    if (!confirm(`¿Estás seguro de ${currentStatus ? 'quitar' : 'dar'} admin a este usuario?`)) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/users/${userId}/admin`, { isAdmin: !currentStatus }, {
        headers: { 'x-auth-token': token }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error toggling admin:', error);
      alert('Error al cambiar admin status');
    }
  };

  const banUser = async (userId, username) => {
    const reason = prompt(`Razón para banear a ${username}:`);
    if (!reason) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/users/${userId}/ban`, { isBanned: true, banReason: reason }, {
        headers: { 'x-auth-token': token }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error banning user:', error);
      alert('Error al banear usuario');
    }
  };

  const unbanUser = async (userId) => {
    if (!confirm('¿Estás seguro de desbanear a este usuario?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/users/${userId}/ban`, { isBanned: false, banReason: null }, {
        headers: { 'x-auth-token': token }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error unbanning user:', error);
      alert('Error al desbanear usuario');
    }
  };

  const updatePoints = async (userId, username, currentPoints) => {
    const newPoints = prompt(`Nuevos puntos para ${username}:`, currentPoints);
    if (newPoints === null) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/users/${userId}/points`, { points: parseInt(newPoints) }, {
        headers: { 'x-auth-token': token }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating points:', error);
      alert('Error al actualizar puntos');
    }
  };

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
            <i className="fas fa-chart-line"></i> estadísticas
          </div>
        </div>
        <div className="tile-content">
          <div className="badge"><i className="fas fa-users"></i> Total usuarios: {users.length}</div>
          <div className="badge"><i className="fas fa-crown"></i> Admins: {users.filter(u => u.isAdmin).length}</div>
          <div className="badge"><i className="fas fa-ban"></i> Baneados: {users.filter(u => u.isBanned).length}</div>
          <div className="badge"><i className="fas fa-gamepad"></i> Activos: {users.filter(u => !u.isBanned).length}</div>
        </div>
      </div>

      {/* TILE - LISTA DE USUARIOS */}
      <div className="tile full-width">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-users-cog"></i> gestión de usuarios
          </div>
        </div>
        <div className="tile-content">
          {loading ? (
            <div style={{ textAlign: 'center' }}>Cargando...</div>
          ) : (
            <div style={{ display: 'grid', gap: '10px', maxHeight: '600px', overflowY: 'auto' }}>
              {users.map(user => (
                <div
                  key={user.id}
                  style={{
                    background: 'var(--tile-dark)',
                    padding: '15px',
                    borderRadius: '8px',
                    border: `1px solid ${user.isBanned ? '#f44336' : user.isAdmin ? '#FFD700' : 'var(--border-color)'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--accent-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '10px',
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}>
                        {user.username[0].toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>
                          {user.username}
                          {user.isAdmin && <span style={{ marginLeft: '5px' }}><i className="fas fa-crown"></i></span>}
                          {user.isBanned && <span style={{ marginLeft: '5px' }}><i className="fas fa-ban"></i></span>}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          {user.email || 'Sin email'}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 600 }}>{user.totalPoints?.toLocaleString() || 0} pts</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Racha: {user.currentStreak || 0}d
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => toggleAdmin(user.id, user.isAdmin)}
                      style={{
                        padding: '5px 10px',
                        background: user.isAdmin ? '#FFA000' : '#FFD700',
                        border: 'none',
                        color: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      {user.isAdmin ? 'Quitar Admin' : 'Hacer Admin'}
                    </button>
                    {user.isBanned ? (
                      <button
                        onClick={() => unbanUser(user.id)}
                        style={{
                          padding: '5px 10px',
                          background: '#4CAF50',
                          border: 'none',
                          color: 'white',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          flex: 1
                        }}
                      >
                        Desbanear
                      </button>
                    ) : (
                      <button
                        onClick={() => banUser(user.id, user.username)}
                        style={{
                          padding: '5px 10px',
                          background: '#f44336',
                          border: 'none',
                          color: 'white',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          flex: 1
                        }}
                      >
                        Banear
                      </button>
                    )}
                    <button
                      onClick={() => updatePoints(user.id, user.username, user.totalPoints)}
                      style={{
                        padding: '5px 10px',
                        background: '#2196F3',
                        border: 'none',
                        color: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      Puntos
                    </button>
                  </div>
                  {user.banReason && (
                    <div style={{ marginTop: '10px', fontSize: '12px', color: '#f44336' }}>
                      Razón de ban: {user.banReason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
