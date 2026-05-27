import React from 'react';

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
  return (
    <div className="tiles-grid">
      {/* TILE PRINCIPAL - ASCII TIERRA */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-globe-americas"></i> planeta the world
          </div>
        </div>
        <div className="tile-content">
          <div className="ascii-earth">
            {asciiEarth}
          </div>
          <div className="info-row" style={{ marginTop: '14px' }}>
            <span className="info-label"><i className="fas fa-quote-left"></i> esencia</span>
            <span className="value">"convierte tu productividad en un ecosistema vivo"</span>
          </div>
          <div className="badge"><i className="fas fa-globe"></i> gamificación · 75+ especies · rarezas míticas</div>
          <div className="badge"><i className="fas fa-bolt"></i> tareas diarias · rachas · evolución de mascotas</div>
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
              <strong>2.4k</strong>
            </div>
            <div className="stat-card-sm">
              <i className="fas fa-crown"></i> míticos obtenidos<br />
              <strong>2</strong>
            </div>
            <div className="stat-card-sm">
              <i className="fas fa-chart-simple"></i> bonus activo<br />
              <strong>+1.85x</strong>
            </div>
          </div>
          <div className="info-row">
            <span className="info-label"><i className="fas fa-star"></i> rareza legendaria</span>
            <span>multiplicador +80% · ejemplar: fénix ancestral</span>
          </div>
          <div className="progress-bg">
            <div className="progress-fill" style={{ width: '68%' }}></div>
          </div>
          <div><i className="fas fa-heart"></i> tu mascota favorita: "Ignis" (legendario) +5% extra</div>
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
            <i className="fas fa-code-branch"></i> filosofía neofetch
          </div>
        </div>
        <div className="tile-content">
          <div>✦ stack: react · node.js · mongodb · redis</div>
          <div>✦ frontend: tailwind · framer motion · zustand</div>
          <div>✦ backend: express, socket.io, jwt</div>
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
            <span><strong>18,400 pts</strong> · histórico: 24,200</span>
          </div>
          <div className="info-row">
            <span className="info-label"><i className="fas fa-fire"></i> racha actual</span>
            <span><strong>9 días</strong> · mejor racha: 34d</span>
          </div>
          <div className="progress-bg">
            <div className="progress-fill" style={{ width: '74%' }}></div>
          </div>
          <div className="badge"><i className="fas fa-bullseye"></i> próximo hito: 20k pts</div>
          <div className="badge"><i className="fas fa-trophy"></i> mejor mes: 45k pts (ago)</div>
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
            <i className="fas fa-tasks"></i> actividades pendientes
          </div>
        </div>
        <div className="tile-content">
          <div className="badge"><i className="fas fa-book"></i> Aprendizaje: 3 tareas</div>
          <div className="badge"><i className="fas fa-dumbbell"></i> Deporte: 2 tareas</div>
          <div className="badge"><i className="fas fa-broom"></i> Hogar: 1 tarea</div>
          <div style={{ marginTop: '12px', textAlign: 'center' }}>
            <strong>6 tareas pendientes hoy</strong>
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
          <div><span className="badge">75+ especies</span> <span className="badge">desbloqueadas: 14</span></div>
          <div className="stat-group">
            <div className="stat-card-sm"><i className="fas fa-dragon"></i> mítico: fénix</div>
            <div className="stat-card-sm"><i className="fas fa-crown"></i> legendario: ignis</div>
            <div className="stat-card-sm"><i className="fas fa-star"></i> épico: grifo</div>
          </div>
        </div>
      </div>
    </div>
  );
}
