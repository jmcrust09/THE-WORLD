import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const asciiEarth = `                  *+++*++==+#*##                  
             @#@+***##*@@@@%*=**#*+*#             
          ==@@%@*@#*@@**#@@@@***+*#%=*#*          
        -=*@@#%%**%**@**+@@+++++**@#@@%***        
      -=+%#@@##*=*@#%%#++==+++++++%@*@#@+%+@      
     -=*@@@@@%%%*%%@%@%@*+====+===-=+**@+@*#@     
    -=*@@@@@%#*#*#@@%@#*%%*====+++==+%@@++*+++    
   ==+@@@@@%*##%@%+**===-======+++=--=*%+@@+@%#   
  ===%@@@@***#%#++=-=-------==+++---===@@@@%@@##  
 -===#@@#+@%=++*+---==---=-======---==*%@@#%@@@@# 
 ====+#@*=+++@%*==--------====------=+@##%%%@@@#@ 
-====-@@*+@@+@#@+---------===------==+@*%%%%%@@%@%
=====+==#@#=--++-@-:--=--==+=----===+++++#%###@#%@
=====+====*@#++=+===**=---+==-------===@%%@#**#@@@
=====++==+++#++#*@#+@@+=====-+=-=----====*#@@=+%@%
=====++=++++++=@@*+#%*+%@+================--==+#%@
 =====++++++++*@%#**@*###*@+=======-==:+=====-=*@  
 ===+======++#@#***++++*+*%++**+===---===+===-=+@ 
  ==+========*@#****++**##**##%#+=----==+==---=@   
   =+=========+@%@#*##%%%##%@@%*==--====+==---*    
    ===========++@@#*###@#@@@@#===---=====--+=     
     =+=========-=@@#%*+%%@@@#+===----=======      
      ==+==+==+===*@@#*+%@@*++===--===+===-=       
        ===+======+@@#*+*%+=====+===+=+===         
          +===+===*@@*#@*==--==========+           
             ======*@*#*=----=+-++==-              
                  ===+==++==++=+                   `;

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="tiles-grid">
      {/* TILE PRINCIPAL - ASCII TIERRA */}
      <div className="tile wide">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-globe"></i> planeta the world
          </div>
        </div>
        <div className="tile-content">
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div className="ascii-earth" style={{ flex: 1, fontSize: '10px' }}>
              {asciiEarth}
            </div>
            <div style={{ flex: 1 }}>
              <div className="info-row">
                <span className="info-label"><i className="fas fa-lightbulb"></i> esencia</span>
                <span className="value">"convierte tu productividad en un ecosistema vivo"</span>
              </div>
              <div className="badge"><i className="fas fa-gamepad"></i> gamificación · 75+ especies · rarezas míticas</div>
              <div className="badge"><i className="fas fa-bolt"></i> tareas diarias · rachas · evolución de mascotas</div>
            </div>
          </div>
        </div>
      </div>

      {/* TILE - ESTADO DEL MUNDO */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-chart-line"></i> estado del mundo
          </div>
        </div>
        <div className="tile-content">
          <div className="stat-group">
            <div className="stat-card-sm">
              <i className="fas fa-egg"></i> huevos totales<br />
              <strong>{user?.pets?.length || 0}</strong>
            </div>
            <div className="stat-card-sm">
              <i className="fas fa-crown"></i> bonus activo<br />
              <strong>+{user?.bonusMultiplier?.toFixed(2) || '1.00'}x</strong>
            </div>
            <div className="stat-card-sm">
              <i className="fas fa-trophy"></i> mejor racha<br />
              <strong>{user?.bestStreak || 0}d</strong>
            </div>
          </div>
          <div className="info-row">
            <span className="info-label"><i className="fas fa-star"></i> rareza legendaria</span>
            <span>multiplicador +80% · ejemplar: fénix ancestral</span>
          </div>
          <div className="progress-bg">
            <div className="progress-fill" style={{ width: `${Math.min((user?.totalPoints || 0) / 20000 * 100, 100)}%` }}></div>
          </div>
          <div><i className="fas fa-heart"></i> tu mascota favorita: {user?.pets?.[0]?.name || 'Ninguna'} ({user?.pets?.[0]?.rarity || 'N/A'})</div>
        </div>
      </div>

      {/* TILE - FILOSOFÍA STACK */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-tools"></i> filosofía neofetch
          </div>
        </div>
        <div className="tile-content">
          <div><i className="fas fa-code"></i> stack: react · node.js · postgresql</div>
          <div><i className="fas fa-laptop-code"></i> frontend: tailwind · axios · context</div>
          <div><i className="fas fa-server"></i> backend: express, sequelize, jwt</div>
          <div className="ascii-earth" style={{ fontSize: '9px', marginTop: '12px' }}>
{`    "cada tarea fortalece tu ecosistema"
    — the world, v2.0`}
          </div>
        </div>
      </div>

      {/* TILE - PUNTOS Y RACHA */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-fire"></i> progreso y racha
          </div>
        </div>
        <div className="tile-content">
          <div className="info-row">
            <span className="info-label"><i className="fas fa-coins"></i> puntos</span>
            <span><strong>{(user?.totalPoints || 0).toLocaleString()} pts</strong></span>
          </div>
          <div className="info-row">
            <span className="info-label"><i className="fas fa-fire"></i> racha actual</span>
            <span><strong>{user?.currentStreak || 0} días</strong> · mejor racha: {user?.bestStreak || 0}d</span>
          </div>
          <div className="progress-bg">
            <div className="progress-fill" style={{ width: `${Math.min((user?.currentStreak || 0) / 30 * 100, 100)}%` }}></div>
          </div>
          <div className="badge"><i className="fas fa-bullseye"></i> próximo hito: {Math.ceil(((user?.totalPoints || 0) / 5000) + 1) * 5000} pts</div>
        </div>
      </div>

      {/* TILE - ACTIVIDADES PENDIENTES */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-clipboard-list"></i> actividades pendientes
          </div>
        </div>
        <div className="tile-content">
          <div className="badge"><i className="fas fa-book"></i> Aprendizaje: pendiente</div>
          <div className="badge"><i className="fas fa-dumbbell"></i> Deporte: pendiente</div>
          <div className="badge"><i className="fas fa-broom"></i> Hogar: pendiente</div>
          <div style={{ marginTop: '12px', textAlign: 'center' }}>
            <strong>Ve a la sección de actividades</strong>
          </div>
        </div>
      </div>

      {/* TILE - COLECCIÓN DE MASCOTAS */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-paw"></i> colección viva
          </div>
        </div>
        <div className="tile-content">
          <div><span className="badge">75+ especies</span> <span className="badge">desbloqueadas: {user?.pets?.length || 0}</span></div>
          <div className="stat-group">
            <div className="stat-card-sm"><i className="fas fa-dragon"></i> mítico: {user?.pets?.find(p => p.rarity === 'mítico')?.name || 'Ninguno'}</div>
            <div className="stat-card-sm"><i className="fas fa-crown"></i> legendario: {user?.pets?.find(p => p.rarity === 'legendario')?.name || 'Ninguno'}</div>
            <div className="stat-card-sm"><i className="fas fa-star"></i> épico: {user?.pets?.find(p => p.rarity === 'épico')?.name || 'Ninguno'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
