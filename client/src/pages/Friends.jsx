import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = API_BASE;

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
  }, []);

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/friends', {
        headers: { 'x-auth-token': token }
      });
      setFriends(res.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/friends/requests', {
        headers: { 'x-auth-token': token }
      });
      setFriendRequests(res.data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const searchUsers = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/friends/search?q=${query}`, {
        headers: { 'x-auth-token': token }
      });
      setSearchResults(res.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const sendFriendRequest = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/friends/request', { friendId: userId }, {
        headers: { 'x-auth-token': token }
      });
      setSearchResults(searchResults.filter(u => u.id !== userId));
      alert('Solicitud enviada');
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Error al enviar solicitud');
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/friends/request/${requestId}/accept`, {}, {
        headers: { 'x-auth-token': token }
      });
      setFriendRequests(friendRequests.filter(r => r.id !== requestId));
      fetchFriends();
    } catch (error) {
      console.error('Error accepting friend request:', error);
      alert('Error al aceptar solicitud');
    }
  };

  const rejectFriendRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/friends/request/${requestId}/reject`, {}, {
        headers: { 'x-auth-token': token }
      });
      setFriendRequests(friendRequests.filter(r => r.id !== requestId));
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      alert('Error al rechazar solicitud');
    }
  };

  const removeFriend = async (friendId) => {
    if (!confirm('¿Estás seguro de eliminar a este amigo?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/friends/${friendId}`, {
        headers: { 'x-auth-token': token }
      });
      setFriends(friends.filter(f => f.id !== friendId));
    } catch (error) {
      console.error('Error removing friend:', error);
      alert('Error al eliminar amigo');
    }
  };

  return (
    <div className="tiles-grid">
      {/* TILE - BUSCAR USUARIOS */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-search"></i> buscar usuarios
          </div>
        </div>
        <div className="tile-content">
          <input
            type="text"
            placeholder="Buscar por nombre de usuario..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchUsers(e.target.value);
            }}
            className="form-input"
          />
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '12px' }}>
            {searchResults.length === 0 && searchQuery ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                No se encontraron usuarios
              </div>
            ) : (
              searchResults.map(user => (
                <div
                  key={user.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    borderBottom: '1px solid var(--border-color)',
                    background: 'var(--tile-dark)',
                    marginBottom: '8px',
                    borderRadius: '4px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: 'var(--tile-bg)'
                    }}>
                      {user.username[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-light)' }}>{user.username}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {user.totalPoints || 0} pts
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => sendFriendRequest(user.id)}
                    className="btn-primary"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    <i className="fas fa-user-plus"></i> Añadir
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* TILE - SOLICITUDES DE AMISTAD */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-envelope"></i> solicitudes ({friendRequests.length})
          </div>
        </div>
        <div className="tile-content">
          {friendRequests.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
              No hay solicitudes pendientes
            </div>
          ) : (
            friendRequests.map(request => (
              <div
                key={request.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderBottom: '1px solid var(--border-color)',
                  background: 'var(--tile-dark)',
                  marginBottom: '8px',
                  borderRadius: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'var(--tile-bg)'
                  }}>
                    {request.requester.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-light)' }}>{request.requester.username}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {request.requester.totalPoints || 0} pts
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => acceptFriendRequest(request.id)}
                    className="btn-primary"
                    style={{ padding: '6px 10px', fontSize: '12px', background: '#4CAF50', borderColor: '#4CAF50' }}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                  <button
                    onClick={() => rejectFriendRequest(request.id)}
                    className="btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '12px', background: '#f44336', borderColor: '#f44336', color: 'white' }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TILE - LISTA DE AMIGOS */}
      <div className="tile full-width">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-users"></i> mis amigos ({friends.length})
          </div>
        </div>
        <div className="tile-content">
          {loading ? (
            <div style={{ textAlign: 'center' }}>Cargando...</div>
          ) : friends.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
              <i className="fas fa-user-friends" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}></i>
              <div>No tienes amigos aún. ¡Busca usuarios para añadir!</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
              {friends.map(friend => (
                <div
                  key={friend.id}
                  style={{
                    background: 'var(--tile-dark)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: 'var(--tile-bg)',
                      border: '2px solid var(--accent)'
                    }}>
                      {friend.friend?.profilePictureUrl ? (
                        <img src={friend.friend.profilePictureUrl} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        friend.friend?.username[0]?.toUpperCase() || 'U'
                      )}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-light)', fontSize: '14px' }}>{friend.friend?.username || 'Unknown'}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        <i className="fas fa-coins"></i> {friend.friend?.totalPoints || 0} pts
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '12px', padding: '10px', background: 'var(--tile-bg)', borderRadius: '4px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      <i className="fas fa-fire" style={{ color: '#ff6b6b' }}></i> Racha de amistad: <strong style={{ color: 'var(--accent)' }}>{friend.friendshipStreak || 0}</strong> días
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      <i className="fas fa-star" style={{ color: '#ffd93d' }}></i> Bonus: <strong style={{ color: 'var(--accent)' }}>+{((friend.friendshipStreak || 0) * 0.05).toFixed(2)}x</strong>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFriend(friend.id)}
                    className="btn-secondary"
                    style={{ width: '100%', padding: '8px', fontSize: '12px', background: '#f44336', borderColor: '#f44336', color: 'white' }}
                  >
                    <i className="fas fa-user-minus"></i> Eliminar amigo
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
