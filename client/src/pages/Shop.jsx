import React, { useEffect, useState } from 'react';

export default function Shop() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({ totalPoints: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user info and shop items from MongoDB backend
    Promise.all([
      fetch('http://localhost:5000/api/shop').then(res => res.json()),
      fetch('http://localhost:5000/api/user/mock').then(res => res.json())
    ])
    .then(([shopData, userData]) => {
      if (Array.isArray(shopData)) setItems(shopData);
      if (userData && userData.totalPoints !== undefined) setUser(userData);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching data from backend", err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-grey font-mono">Cargando tienda desde MongoDB...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 border-b border-beige pb-4">
        <h2 className="text-dark font-medium">🥚 Tienda de Huevos</h2>
        <div className="bg-[rgba(248,244,239,0.8)] px-3 py-1 rounded-full border border-beige font-mono">
          💎 Tus puntos: {user.totalPoints.toLocaleString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        {items.length === 0 ? (
          <div className="col-span-3 text-center text-grey">No hay items en la tienda. Ejecuta 'node seed.js' en el backend.</div>
        ) : (
          items.map(item => (
            <div key={item._id} className={`p-5 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow border ${item.cssClass}`}>
              {item.name === 'Huevo Premium' && (
                <div className="absolute -top-3 right-3 bg-[#e8a87c] text-white text-[10px] px-2 py-0.5 rounded-full">Recomendado</div>
              )}
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-medium text-dark">{item.name}</h3>
              <p className="text-xs text-grey my-2 h-8">{item.description}</p>
              <button 
                className={`w-full py-2 rounded-xl mt-2 transition-colors ${
                  item.name === 'Huevo Premium' 
                    ? 'bg-[#e8a87c] text-white hover:opacity-90' 
                    : item.cost > user.totalPoints 
                      ? 'bg-[rgba(227,221,212,0.3)] text-grey cursor-not-allowed'
                      : 'bg-[rgba(227,221,212,0.3)] hover:bg-beige2 text-dark'
                }`}
                disabled={item.cost > user.totalPoints}
              >
                Comprar ({item.cost.toLocaleString()} pts)
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
