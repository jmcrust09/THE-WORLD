import React from 'react';

export default function Activities() {
  return (
    <div className="p-4 bg-[rgba(248,244,239,0.5)] rounded-2xl border border-beige">
      <h2 className="text-dark font-medium mb-4 flex items-center gap-2">
        <span>📝</span> Bitácora de Actividades
      </h2>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-bg border border-beige rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 accent-blue" defaultChecked />
            <span className="line-through text-grey">🏃 Ejercicio matutino</span>
          </div>
          <span className="text-sm text-green-600">+150 pts</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-bg border border-beige rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 accent-blue" />
            <span>📚 Leer 30 min</span>
          </div>
          <span className="text-sm text-blue">+100 pts</span>
        </div>
        
        <button className="w-full py-3 border border-dashed border-beige2 rounded-xl text-grey hover:bg-[rgba(227,221,212,0.3)] transition-colors">
          + Añadir actividad
        </button>
      </div>
    </div>
  );
}
