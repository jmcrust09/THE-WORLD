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
            🔍 buscar usuarios
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
            style={{
              width: '100%',
              padding: '10px',
              background: 'var(--tile-dark)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-color)',
              borderRadius: '4px',
              marginBottom: '10px'
            }}
          />
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {searchResults.map(user => (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                <span>{user.username}</span>
                <button
                  onClick={() => sendFriendRequest(user.id)}
                  style={{
                    padding: '5px 10px',
                    background: 'var(--accent-color)',
                    border: 'none',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Añadir
                </button>
              </div>
            ))}
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
            📨 solicitudes ({friendRequests.length})
          </div>
        </div>
        <div className="tile-content">
          {friendRequests.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
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
                  padding: '10px',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{request.requester.username}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Racha: {request.friendshipStreak || 0}d
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => acceptFriendRequest(request.id)}
                    style={{
                      padding: '5px 10px',
                      background: '#4CAF50',
                      border: 'none',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '5px'
                    }}
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => rejectFriendRequest(request.id)}
                    style={{
                      padding: '5px 10px',
                      background: '#f44336',
                      border: 'none',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    ✗
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
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              No tienes amigos aún. ¡Busca usuarios para añadir!
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
              {friends.map(friend => (
                <div
                  key={friend.id}
                  style={{
                    background: 'var(--tile-dark)',
                    padding: '15px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
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
                      {friend.username[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{friend.username}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {friend.totalPoints || 0} pts
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      <i className="fas fa-fire"></i> Racha de amistad: {friend.friendshipStreak || 0} días
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      <i className="fas fa-sparkles"></i> Bonus: +{((friend.friendshipStreak || 0) * 0.05).toFixed(2)}x
                    </div>
                  </div>
                  <button
                    onClick={() => removeFriend(friend.id)}
                    style={{
                      width: '100%',
                      padding: '5px',
                      background: '#f44336',
                      border: 'none',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Eliminar amigo
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
