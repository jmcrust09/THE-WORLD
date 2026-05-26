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
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-7 items-start font-mono">

      {/* ASCII Earth */}
      <div className="ascii-zone">
        <pre className="text-[11px] md:text-[13px]">{asciiEarth}</pre>
      </div>

      {/* Info panel neofetch style */}
      <div className="text-[13px] leading-relaxed pl-4 border-l-[3px] border-beige2">
        <div className="text-[15px] font-semibold text-dark tracking-wide mb-3 pb-1 border-b border-beige lowercase">
          the world — <span className="text-blue">gamified productivity</span>
        </div>

        {[
          ['proyecto', 'the world · mascotas + habitos diarios'],
          ['stack', 'react · node.js · express · mongodb'],
          ['frontend', 'vite · tailwind · framer motion · zustand'],
          ['backend', 'node.js + express · socket.io · jwt'],
          ['base de datos', 'mongodb atlas · mongoose odm'],
          ['mascotas', '75+ especies · 6 rarezas · 6 etapas'],
          ['rarezas', 'comun → poco comun → raro → epico → legendario → mitico'],
          ['puntos', 'actividades completadas x racha x bonus mascota'],
          ['estado', 'fase 2 en desarrollo'],
        ].map(([label, value]) => (
          <div key={label} className="flex gap-2 py-[2px] items-baseline">
            <span className="text-dark font-medium min-w-[110px] lowercase">
              <span className="text-blue mr-1">⤷</span>{label}
            </span>
            <span className="text-grey lowercase">{value}</span>
          </div>
        ))}

        <hr className="border-beige my-3 opacity-40" />

        <div className="flex gap-2 text-xs text-grey mt-1">
          <span className="text-blue">✦</span>
          <span className="text-dark italic">
            "convierte tu productividad en un ecosistema vivo"
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap mt-3 text-[11px] text-grey">
          {['huevos', 'mascotas', 'rarezas', 'puntos', 'rachas', 'tienda', 'cosmeticos'].map(tag => (
            <span key={tag} className="bg-[rgba(227,221,212,0.4)] border border-beige px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
