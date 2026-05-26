import React from 'react';
import WindowPanel from '../components/WindowPanel';

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

const stats = [
  { label: 'puntos', value: '2,450', note: 'acumulados esta semana' },
  { label: 'racha', value: '7 días', note: 'mejor racha activa' },
  { label: 'mascota', value: 'Aurelion', note: 'favorita seleccionada' },
  { label: 'rareza', value: 'Épico', note: 'bonus +0.5x aplicado' }
];

export default function Home() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.3fr]">
        <WindowPanel title="mundo" subtitle="pantalla principal" icon="🌍">
          <div className="ascii-zone min-h-[340px]">
            <pre className="text-[10px] leading-tight">{asciiEarth}</pre>
          </div>
        </WindowPanel>
        <div className="grid gap-6">
          <WindowPanel title="resumen" subtitle="sistema de progreso" icon="⚡">
            <div className="grid gap-4 md:grid-cols-2">
              {stats.map((item) => (
                <div key={item.label} className="tile-card">
                  <div className="panel-label">{item.label}</div>
                  <div className="panel-value">{item.value}</div>
                  <div className="panel-note">{item.note}</div>
                </div>
              ))}
            </div>
          </WindowPanel>
          <WindowPanel title="tendencias" subtitle="sistema de rutinas" icon="📈">
            <div className="tile-grid">
              <div className="tile-card">
                <div className="panel-label">actividad estrella</div>
                <div className="panel-value">Ejercicio</div>
                <div className="panel-note">Maximiza tus puntos y desbloquea huevos raros.</div>
              </div>
              <div className="tile-card">
                <div className="panel-label">próximo objetivo</div>
                <div className="panel-value">500 pts</div>
                <div className="panel-note">Compra tu próximo huevo básico en la tienda.</div>
              </div>
              <div className="tile-card">
                <div className="panel-label">bono total</div>
                <div className="panel-value">+1.3x</div>
                <div className="panel-note">Tus mascotas aumentan la eficiencia de cada actividad.</div>
              </div>
            </div>
          </WindowPanel>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <WindowPanel title="estado" subtitle="sistema de rarezas" icon="✨">
          <div className="section-grid cols-3">
            <div className="tile-card">
              <div className="panel-label">mítico</div>
              <div className="panel-value">1</div>
              <div className="panel-note">Mascota ascendido lista para bonificar tus rutinas.</div>
            </div>
            <div className="tile-card">
              <div className="panel-label">legendario</div>
              <div className="panel-value">2</div>
              <div className="panel-note">Más probabilidades de puntos extra en la tienda.</div>
            </div>
            <div className="tile-card">
              <div className="panel-label">épico</div>
              <div className="panel-value">4</div>
              <div className="panel-note">Ideal para desbloquear nuevos huevos premium.</div>
            </div>
          </div>
        </WindowPanel>

        <WindowPanel title="acciones" subtitle="acceso rápido" icon="⌘">
          <div className="grid gap-4">
            <button className="action-button">Abrir bitácora de tareas</button>
            <button className="action-button">Ir a la colección</button>
            <button className="action-button">Visitar tienda de huevos</button>
          </div>
        </WindowPanel>
      </div>
    </div>
  );
}
