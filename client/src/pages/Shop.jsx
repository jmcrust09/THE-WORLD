import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import WindowPanel from '../components/WindowPanel';
import { AuthContext } from '../context/AuthContext';

export default function Shop() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(user?.totalPoints || 0);

  useEffect(() => {
    axios.get('/api/shop')
      .then((res) => setItems(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error('Error fetching shop data', err);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user?.totalPoints !== undefined) setBalance(user.totalPoints);
  }, [user]);

  const handlePurchase = (item) => {
    if (balance < item.cost) return;
    setBalance((current) => current - item.cost);
    setItems((prev) => prev.map((entry) => (entry._id === item._id ? { ...entry, purchased: true } : entry)));
  };

  if (loading) {
    return <div className="p-4 text-center text-grey font-mono animate-pulse">cargando tienda...</div>;
  }

  return (
    <div className="grid gap-6">
      <WindowPanel title="tienda" subtitle="comprar huevos" icon="🥚" extra={`saldo ${balance} pts`}>
        <div className="section-grid cols-3">
          <div className="tile-card">
            <div className="panel-label">saldo actual</div>
            <div className="panel-value">{balance.toLocaleString()}</div>
            <div className="panel-note">Tus puntos disponibles para comprar huevos.</div>
          </div>
          <div className="tile-card">
            <div className="panel-label">total items</div>
            <div className="panel-value">{items.length}</div>
            <div className="panel-note">Huevos disponibles en la tienda.</div>
          </div>
          <div className="tile-card">
            <div className="panel-label">objetivo</div>
            <div className="panel-value">15,000 pts</div>
            <div className="panel-note">Alcanza este umbral para huevos legendarios.</div>
          </div>
        </div>
      </WindowPanel>

      <WindowPanel title="resumen" subtitle="tipos de huevos" icon="🎯">
        <div className="tile-grid">
          {items.map((item) => (
            <div key={item._id} className="tile-card">
              <div className="flex justify-between items-start gap-3 mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-dark">{item.name}</h3>
                  <p className="text-xs text-grey mt-1">{item.description}</p>
                </div>
                <span className="info-badge">{item.cost} pts</span>
              </div>
              <button
                className={`w-full py-3 rounded-2xl transition-all ${item.purchased || item.cost > balance ? 'bg-[rgba(227,221,212,0.3)] text-grey cursor-not-allowed' : 'bg-beige2 text-dark hover:bg-beige'}`}
                onClick={() => handlePurchase(item)}
                disabled={item.purchased || item.cost > balance}
              >
                {item.purchased ? 'Comprado' : item.cost > balance ? 'Falta saldo' : 'Comprar'}
              </button>
            </div>
          ))}
        </div>
      </WindowPanel>
    </div>
  );
}
