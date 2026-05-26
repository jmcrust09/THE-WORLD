// petAsciiArt.js
// ASCII art for every species, per growth stage.
// Accessories (aura, crown, hat) are composited on top.
// Each art is stored as an array of strings (lines).

// ─── STAGE SUFFIXES ────────────────────────────────────────────────
// huevo | bebe | joven | adulto | evolucionado | ascendido

// ─── ACCESSORIES ───────────────────────────────────────────────────
export const ACCESSORIES = {
  none: { top: [], label: "" },
  corona: {
    top: ["    A A A    ", "   | | | |   "],
    label: "corona"
  },
  sombrero: {
    top: ["  _______    ", " /       \\   ", "/         \\  "],
    label: "sombrero"
  },
  aura_fuego: {
    top: ["  ) ( ) (    ", " ( ) ( ) )   "],
    label: "aura de fuego"
  },
  aura_hielo: {
    top: ["  * . * .    ", " . * . * *   "],
    label: "aura de hielo"
  },
  aura_galaxia: {
    top: ["  + . * + .  ", " . + . + * . "],
    label: "aura galáctica"
  }
};

// ─── RARITY BORDER CHARS ───────────────────────────────────────────
export const RARITY_BORDER = {
  comun:      { h: "-", v: "|", tl: "+", tr: "+", bl: "+", br: "+" },
  poco_comun: { h: "=", v: "|", tl: "+", tr: "+", bl: "+", br: "+" },
  raro:       { h: "~", v: ":", tl: "*", tr: "*", bl: "*", br: "*" },
  epico:      { h: "#", v: "#", tl: "@", tr: "@", bl: "@", br: "@" },
  legendario: { h: "=", v: "I", tl: "O", tr: "O", bl: "O", br: "O" },
  mitico:     { h: "*", v: "*", tl: "X", tr: "X", bl: "X", br: "X" }
};

// ─── RARITY LABELS ─────────────────────────────────────────────────
export const RARITY_LABELS = {
  comun:      "COMUN",
  poco_comun: "POCO COMUN",
  raro:       "RARO",
  epico:      "EPICO",
  legendario: "LEGENDARIO",
  mitico:     "MITICO"
};

// ─── RARITY COLORS (CSS classes) ───────────────────────────────────
export const RARITY_COLORS = {
  comun:      "text-[#9a9186]",
  poco_comun: "text-[#388E3C]",
  raro:       "text-[#1976D2]",
  epico:      "text-[#7B1FA2]",
  legendario: "text-[#F57C00]",
  mitico:     "text-[#C62828]"
};

export const RARITY_GLOW = {
  comun:      "",
  poco_comun: "",
  raro:       "drop-shadow(0 0 4px #42A5F5)",
  epico:      "drop-shadow(0 0 6px #AB47BC)",
  legendario: "drop-shadow(0 0 8px #FFA726)",
  mitico:     "drop-shadow(0 0 12px #EF5350)"
};

// ─── PET ASCII ART ─────────────────────────────────────────────────
// Format: PET_ASCII[species][stage]
// Each entry is an array of strings.

const EGG = [
  "   _____   ",
  "  /     \\  ",
  " | o   o | ",
  " |  ---  | ",
  "  \\_____/  "
];

export const PET_ASCII = {

  // ── COMUNES ──────────────────────────────────────────────────────

  "Gato": {
    huevo:        EGG,
    bebe:         ["  /\\_/\\  ", " ( o.o ) ", "  > ^ <  "],
    joven:        [" /\\_/\\   ", "( ^.^ )  ", "(  Y  )  ", " \\___/   "],
    adulto:       [" /\\_____/\\", "( o   o  )", " |  W  |  ", " (_____)  "],
    evolucionado: [" /\\_____/\\", "(  >.<  ) ", " | \\|/ |  ", "  \\___/   ", "   |_|    "],
    ascendido:    ["**/\\_____/\\**", "*(  ^.^  )*", "*| \\*/ |*", "*(_____)* ", "  *|_|*   "]
  },

  "Perro": {
    huevo:        EGG,
    bebe:         ["  (0 0)  ", " =(___)= ", "   | |   "],
    joven:        [" __   __ ", "(  \\_/  )", "( 'o'o ) ", " (-----) "],
    adulto:       [" ___   ___", "( 0   0  )", "(  ---   )", " \\ |_| /  ", "  |   |   "],
    evolucionado: [" ___   ___ ", "( >.  .< )", "(  ---   ) ", " \\  W  /  ", "  |___|   "],
    ascendido:    ["*___   ___*", "*(>..<)*  ", "*(---)*   ", " *\\W/*    ", "  *|_|*   "]
  },

  "Conejo": {
    huevo:        EGG,
    bebe:         [" (\\ /) ", " ( ^.^) ", " (> <)  "],
    joven:        [" /| |\\ ", "(  ^  )", " ( U ) ", "  |_|  "],
    adulto:       [" /\\   /\\", "( *   * )", " (  v  ) ", "  (___) "],
    evolucionado: [" /\\   /\\ ", "(  * *  )", " (  v  ) ", " /|   |\\ ", "  |___|  "],
    ascendido:    ["*/\\   /\\*", "*(  *  )*", "*(v   v)*", " *|___|* "]
  },

  "Hamster": {
    huevo:        EGG,
    bebe:         [" (°•°) ", "( (_) )", "  |_|  "],
    joven:        ["  (o o)  ", " (  Y  ) ", "  |   |  "],
    adulto:       ["  (o . o)  ", " (  ---  ) ", "  |     |  "],
    evolucionado: [" *(o . o)* ", "*(  ---  )*", " *|     |* "],
    ascendido:    ["**( o.o )**", "**(-----)**", " *(_____)* "]
  },

  "Hámster": {
    huevo:        EGG,
    bebe:         [" (°•°) ", "( (_) )", "  |_|  "],
    joven:        ["  (o o)  ", " (  Y  ) ", "  |   |  "],
    adulto:       ["  (o . o)  ", " (  ---  ) ", "  |     |  "],
    evolucionado: [" *(o . o)* ", "*(  ---  )*", " *|     |* "],
    ascendido:    ["**( o.o )**", "**(-----)**", " *(_____)* "]
  },

  "Pez": {
    huevo:        EGG,
    bebe:         [" ><(°> ", "      \\  "],
    joven:        ["  ><(°°>  ", "  \\/     "],
    adulto:       ["   ><((°>  ", "   /\\/    ", "  \\/      "],
    evolucionado: ["  ~><((°>~ ", " ~~\\/~~   "],
    ascendido:    ["*~><((°>~*", "*~~\\/~~*  "]
  },

  "Paloma": {
    huevo:        EGG,
    bebe:         [" >*< ", "('oo')", " ) ( "],
    joven:        [" >***< ", " ('oo') ", "  ) (  "],
    adulto:       [" _   _ ", ">*   *<", "('ooo')", " /   \\ "],
    evolucionado: ["  _   _  ", ">**   **<", " ('oo') ", "  /   \\  "],
    ascendido:    ["*_     _*", "*>*   *<*", "*('oo')*", " */   \\* "]
  },

  "Tortuga": {
    huevo:        EGG,
    bebe:         ["  ___  ", " (o_o) ", " /___\\ "],
    joven:        ["  _____  ", " (o   o) ", " |_____|  "],
    adulto:       ["   _____   ", "  (o   o)  ", " /|_____|\\"],
    evolucionado: ["  #####  ", " (o   o) ", " |#####| "],
    ascendido:    ["*#######*", "*(o   o)*", "*|#####|*"]
  },

  "Ratón": {
    huevo:        EGG,
    bebe:         [" (°°) ", " (UwU)", "  ~~  "],
    joven:        ["  (. .)  ", " (  U  ) ", "  ~~ ~~  "],
    adulto:       ["  (. . .)  ", " (  U    ) ", "  ~~   ~~  "],
    evolucionado: ["  (.  .)  ", " *( U  )* ", "  ~~   ~~  "],
    ascendido:    ["*(.   .)*", "*(  U  )*", " *~   ~* "]
  },

  "Ratón": {
    huevo:        EGG,
    bebe:         [" (°°) ", " (UwU)", "  ~~  "],
    joven:        ["  (. .)  ", " (  U  ) ", "  ~~ ~~  "],
    adulto:       ["  (. . .)  ", " (  U    ) ", "  ~~   ~~  "],
    evolucionado: ["  (.  .)  ", " *( U  )* ", "  ~~   ~~  "],
    ascendido:    ["*(.   .)*", "*(  U  )*", " *~   ~* "]
  },

  "Pollo": {
    huevo:        EGG,
    bebe:         [" (°v°) ", " (  ,  ) "],
    joven:        [" (o v o) ", " (  ---) ", "  |   |  "],
    adulto:       ["  (oVo)  ", " (  ---  ) ", "  | | |  "],
    evolucionado: ["  (oVo)  ", "*( --- )*", " *|   |* "],
    ascendido:    ["*(oVo)*", "*(---)*", "*| |*  "]
  },

  "Rana": {
    huevo:        EGG,
    bebe:         ["  @@ ", " (oo)", "  vv "],
    joven:        ["  @@ @@ ", " ( o  o) ", "  vv vv  "],
    adulto:       ["  @@  @@ ", " (o    o) ", " / vvvv \\ "],
    evolucionado: ["  @@  @@ ", "*(o    o)*", "*/ vvvv \\*"],
    ascendido:    ["*@@  @@*", "*(o  o)*", "*/vvvv\\*"]
  },

  "Lagartija": {
    huevo:        EGG,
    bebe:         [" *-* ", "(>o<)", "~~~~"],
    joven:        ["  *-*-*  ", " (>o  o<)", "  ~~~~   "],
    adulto:       ["  *---*  ", " (>o  o<) ", " /~~~~~~\\ "],
    evolucionado: ["  *---*  ", "*(o    o)*", "*/~~~~~~\\*"],
    ascendido:    ["*---*  ", "*(o  o)*", "*/~~~\\* "]
  },

  "Pato": {
    huevo:        EGG,
    bebe:         [" ('>) ", "  (~) "],
    joven:        [" ('>)  ", "  (~~) ", "  )  ( "],
    adulto:       ["  (  '>)  ", "  (  ~~)  ", "  ))  (( "],
    evolucionado: ["  ('>>)  ", "*(  ~~)* ", " *(  )* "],
    ascendido:    ["*( '>)*", "*(~~~)*", " *( )* "]
  },

  "Cabra": {
    huevo:        EGG,
    bebe:         [" ^ ^ ", "( o )", " )_( "],
    joven:        [" ^   ^ ", "(  o  )", " )___( "],
    adulto:       ["  ^   ^  ", " (  o  ) ", " /|   |\\ "],
    evolucionado: ["  ^   ^  ", "*(  o  )*", " *(   )* "],
    ascendido:    ["*^   ^*", "*(o o)*", "*( _ )*"]
  },

  "Vaca": {
    huevo:        EGG,
    bebe:         [" (o o) ", "( m m )", "  | |  "],
    joven:        ["  (o  o)  ", " ( mm mm) ", "  |    |  "],
    adulto:       ["   (o   o)   ", "  ( mm  mm)  ", " /|        |\\ "],
    evolucionado: ["   (o   o)   ", " *( mm  mm)* ", " *|        |* "],
    ascendido:    ["*(o   o)*   ", "*(mm mm)*  ", "*(     )*  "]
  },

  "Oveja": {
    huevo:        EGG,
    bebe:         [" oOo ", "(^_^)", " | | "],
    joven:        [" oOoOo ", "(^   ^) ", " |   | "],
    adulto:       ["  oOoOoOo  ", " (^       ^) ", "  |       | "],
    evolucionado: [" *oOoOoOo* ", "*(^      ^)* ", " *|      |* "],
    ascendido:    ["*oOoOoOo*", "*(^    ^)*", "*|      |*"]
  },

  "Cerdo": {
    huevo:        EGG,
    bebe:         [" (oUo) ", " ( w ) "],
    joven:        [" (o U o) ", " (  w   )", "  |   |  "],
    adulto:       ["  (o   o)  ", " ( w   w ) ", "  |     |  "],
    evolucionado: ["  (o   o)  ", "*(  www  )* ", " *|     |* "],
    ascendido:    ["*(o   o)*", "*(  w  )*", "*(___)*  "]
  },

  // ── POCO COMUNES ─────────────────────────────────────────────────

  "Zorro": {
    huevo:        EGG,
    bebe:         ["  /\\  /\\  ", " (  \\/  ) ", "  \\    /  "],
    joven:        [" /\\    /\\ ", "(  o  o  )", " \\  --  / ", "  \\____/  "],
    adulto:       ["  /\\    /\\ ", " (  o  o  )", " (  ----  )", "  \\      /  ", "   \\____/   "],
    evolucionado: ["  /\\    /\\ ", "*(  *  *  )*", "*(  ----  )*", " *\\      /* ", "  *\\____/*  "],
    ascendido:    ["*/\\    /\\*", "*(o    o)*", "*(----)*  ", "*\\____/*  "]
  },

  "Búho": {
    huevo:        EGG,
    bebe:         ["  (OwO)  ", "  { v }  "],
    joven:        [" ,{OvO}, ", "( {   } )", "  {   }  "],
    adulto:       [" ,,{OvO},, ", "( {     } )", " {       } "],
    evolucionado: ["  ,{OvO},  ", "*( {   } )*", " *{     }* "],
    ascendido:    ["*,{OvO},*", "*{     }*", "*{     }*"]
  },

  "Erizo": {
    huevo:        EGG,
    bebe:         [" /\\/\\ ", "(o . o)", " \\__/ "],
    joven:        [" /\\/\\/\\ ", "(o     o)", " \\____ /"],
    adulto:       ["  /\\/\\/\\/\\  ", " (o       o) ", " \\__________/"],
    evolucionado: [" */\\/\\/\\/\\* ", "*(o       o)*", "*\\__________/*"],
    ascendido:    ["*/\\/\\/\\/\\*", "*(o     o)*", "*\\______/*"]
  },

  "Pingüino": {
    huevo:        EGG,
    bebe:         [" (> <) ", "( 'o' )", " |   | "],
    joven:        [" (>   <) ", "( ' o ' )", " |     | "],
    adulto:       ["  (>     <)  ", " (  ' o '  ) ", "  |         |  "],
    evolucionado: ["  (>     <)  ", "*(  ' o '  )*", " *|       |* "],
    ascendido:    ["*(>   <)*", "*(' o ')*", "*(  _  )*"]
  },

  "Ardilla": {
    huevo:        EGG,
    bebe:         ["  ( ^ )  ", " (o . o) ", "  \\ _ /  "],
    joven:        [" (  ^  ) ", "(o     o)", " \\  _ /  "],
    adulto:       ["  (  ^  )  ", " (o       o) ", "  \\       /  "],
    evolucionado: ["  (  ^  )  ", "*(o       o)*", " *\\       /* "],
    ascendido:    ["*(  ^  )*", "*(o   o)*", "*\\     /*"]
  },

  "Mapache": {
    huevo:        EGG,
    bebe:         [" (#_#) ", "(  w  )"],
    joven:        [" (#   #) ", "(  www  )", "  |   |  "],
    adulto:       ["  (#    #)  ", " (  wwww  ) ", "  |        |  "],
    evolucionado: ["  (#    #)  ", "*(  wwww  )*", " *|        |* "],
    ascendido:    ["*(#   #)*", "*(www)*  ", "*(  _)*  "]
  },

  "Camaleón": {
    huevo:        EGG,
    bebe:         [" ~(o)~  ", "  (---)  "],
    joven:        [" ~~(o)~~  ", "  (~~~~~)  "],
    adulto:       ["  ~~~(o)~~~  ", " (~~~~~~~~~) "],
    evolucionado: ["  ~~~(*)~~~  ", "*(~~~~~~~~~)*"],
    ascendido:    ["*~~(*)*~~*", "*(~~~~~)*  "]
  },

  "Loro": {
    huevo:        EGG,
    bebe:         [" (>v) ", " (|||)", "  / \\ "],
    joven:        [" (>  v)  ", " ( ||| ) ", "  /   \\  "],
    adulto:       ["  (>    v)  ", " (  |||  ) ", "  /       \\  "],
    evolucionado: ["  (>    v)  ", "*(  |||  )*", " */       \\* "],
    ascendido:    ["*(>  v)*", "*(|||)*  ", "*( _ )*  "]
  },

  "Castor": {
    huevo:        EGG,
    bebe:         ["  (oO)  ", "  (/\\)  "],
    joven:        ["  (o  O)  ", "  (/    \\)  "],
    adulto:       ["   (o     O)   ", "  (/          \\)  "],
    evolucionado: ["  *(o     O)*  ", "  */         \\*  "],
    ascendido:    ["*(o   O)*", "*/     \\*"]
  },

  "Armadillo": {
    huevo:        EGG,
    bebe:         [" [o.o] ", " [___] "],
    joven:        ["  [o   o]  ", "  [ ___ ]  "],
    adulto:       ["   [o      o]   ", "   [_________]  "],
    evolucionado: ["  *[o      o]*  ", "  *[_________]*  "],
    ascendido:    ["*[o    o]*", "*[_____]*"]
  },

  "Zorrillo": {
    huevo:        EGG,
    bebe:         [" (@^@) ", " (----)", "  ~~~~  "],
    joven:        ["  (@  @)  ", " (------) ", "  ~~~~~~  "],
    adulto:       ["   (@     @)   ", "  (----------) ", "   ~~~~~~~~~~   "],
    evolucionado: ["  *(@     @)*  ", "  *(----------)*", "   *~~~~~~~~~~*   "],
    ascendido:    ["*(@   @)*", "*(-----)*", "*~~~~~*  "]
  },

  "Llama": {
    huevo:        EGG,
    bebe:         [" ^ ", "(o)", "|||"],
    joven:        ["  ^  ", " (o) ", " ||| "],
    adulto:       ["   ^   ", "  (o)  ", " /|||\\  "],
    evolucionado: ["  *^*  ", "*(o)*  ", "*|||*  "],
    ascendido:    ["*^*", "*()*", "*|*"]
  },

  "Alpaca": {
    huevo:        EGG,
    bebe:         [" {^} ", "(o o)", " | | "],
    joven:        ["  {^}  ", " (o  o) ", " |    | "],
    adulto:       ["   {^}   ", "  (o    o)  ", " /|        |\\ "],
    evolucionado: ["  *{^}*  ", "*(o    o)*", "*/|      |\\*"],
    ascendido:    ["*{^}*", "*(oo)*", "*(  )*"]
  },

  "Canguro": {
    huevo:        EGG,
    bebe:         [" (o) ", "( Y )", " | | "],
    joven:        [" (o  ) ", "(  Y  )", " |    | "],
    adulto:       ["  (o   )  ", " (   Y   ) ", " /|       |\\ "],
    evolucionado: ["  (o   )  ", "*(   Y   )*", " *|       |* "],
    ascendido:    ["*(o  )*", "*(Y  )*", "*(  )*"]
  },

  // ── RAROS ────────────────────────────────────────────────────────

  "Lobo": {
    huevo:        EGG,
    bebe:         ["  /^\\  ", " (o.o) ", "  )_(  "],
    joven:        ["  /^^\\  ", " (o   o) ", " /|   |\\ "],
    adulto:       ["   /^^\\   ", "  (o     o)  ", " / |       | \\ "],
    evolucionado: ["  */^^\\*  ", "*(o     o)*", "*/ |       | \\*"],
    ascendido:    ["*/ ^^  \\*", "*(o   o)*  ", "* \\___/ *  "]
  },

  "Ciervo": {
    huevo:        EGG,
    bebe:         [" Y   Y ", "(  o  )", "  | |  "],
    joven:        [" YY   YY ", "(  o   o) ", "  |     | "],
    adulto:       ["  YY     YY  ", " (  o     o)  ", "  |           | "],
    evolucionado: ["  YY     YY  ", "*(  *     *)* ", " *|           |*"],
    ascendido:    ["*YY   YY*", "*(o   o)*", "*\\ ___ /*"]
  },

  "Águila": {
    huevo:        EGG,
    bebe:         ["  >*<  ", " (o.o) ", "  V V  "],
    joven:        ["  >***<  ", " ( o.o ) ", "  V   V  "],
    adulto:       ["   >*****<   ", "  ( o   o )  ", "   V       V   "],
    evolucionado: ["  *>*****<*  ", "*(  o   o  )*", " *V         V* "],
    ascendido:    ["*>*****<*", "*(o   o)*", "*V     V*"]
  },

  "Delfín": {
    huevo:        EGG,
    bebe:         ["  /^\\  ", " ( o ) ", "  |~|  "],
    joven:        ["   /^^\\   ", "  (  o  )  ", "  |~~~~~|  "],
    adulto:       ["    /^^^\\    ", "   (   o   )   ", "  |~~~~~~~~~~|  "],
    evolucionado: ["   */^^^\\*   ", "  *(   o   )*  ", "  *|~~~~~~~~|*  "],
    ascendido:    ["*/^^^\\*  ", "*(  o  )*", "*|~~~~~|*"]
  },

  "Pantera": {
    huevo:        EGG,
    bebe:         [" (/\\o/\\) ", "  | - |  "],
    joven:        [" (/\\  /\\) ", " (  o  o) ", "  |  -  | "],
    adulto:       ["  (/\\    /\\)  ", " (  o    o  ) ", "  |    -    |  "],
    evolucionado: ["  (/\\    /\\)  ", "*(  *    *  )*", " *|    -    |* "],
    ascendido:    ["*(/\\ /\\)*", "*(o   o)*", "*| - |*  "]
  },

  "Oso Polar": {
    huevo:        EGG,
    bebe:         ["  (o o)  ", " (  U  ) ", "  |   |  "],
    joven:        ["   (o   o)   ", "  (   U   )  ", "  |         | "],
    adulto:       ["    (o     o)    ", "   (    U    )   ", "  /|           |\\ "],
    evolucionado: ["   *(o     o)*   ", "  *(    U    )*  ", " * |           |* "],
    ascendido:    ["*(o   o)*  ", "*( U   )*  ", "*(     )*  "]
  },

  "Mantarraya": {
    huevo:        EGG,
    bebe:         [" ( . ) ", "  \\ /  ", "   ~   "],
    joven:        ["  (  .  )  ", "   \\   /   ", "    ~~~    "],
    adulto:       ["   (    .    )   ", "    \\         /   ", "     ~~~~~~~~~   "],
    evolucionado: ["  *(    .    )*  ", "   *\\       /*   ", "   *~~~~~~~~~*   "],
    ascendido:    ["*(   .   )*", "*\\       /*", "*~~~~~~~*  "]
  },

  "Tiburón": {
    huevo:        EGG,
    bebe:         [" /\\ ", "(>o)", " \\/ "],
    joven:        ["   /\\   ", " (>  o<) ", "   \\/   "],
    adulto:       ["    /\\    ", "  (>   o<)  ", "   |>   |   ", "    \\/   "],
    evolucionado: ["   */\\*   ", "  *(> o<)*  ", "  *|>   |*  ", "   *\\/    "],
    ascendido:    ["*/\\*  ", "*(>o)*", "*\\/  *"]
  },

  "Tigre": {
    huevo:        EGG,
    bebe:         [" (|O|) ", " ( W ) "],
    joven:        ["  (|O |)  ", "  (  W  )  ", "   |   |   "],
    adulto:       ["   (|O   O|)   ", "   (    W    )   ", "  /|           |\\ "],
    evolucionado: ["  *(|O   O|)*  ", "  *(    W    )*  ", "  *|           |* "],
    ascendido:    ["*(|O O|)*", "*(  W  )*", "*\\ ___ /*"]
  },

  "León": {
    huevo:        EGG,
    bebe:         ["  {oOo}  ", "  ( w )  "],
    joven:        ["  {{oOo}}  ", "  (  w  )  ", "   |   |   "],
    adulto:       ["   {{{oOo}}}   ", "   (    w    )   ", "  /|           |\\ "],
    evolucionado: ["  *{{{oOo}}}*  ", "  *(    w    )*  ", "  *|           |* "],
    ascendido:    ["*{oOo}*  ", "*(  w  )* ", "*(   )*  "]
  },

  "Gorila": {
    huevo:        EGG,
    bebe:         [" [o o] ", " [ U ] "],
    joven:        ["  [o   o]  ", "  [  U  ]  ", "  [     ]  "],
    adulto:       ["   [o     o]   ", "   [   U   ]   ", "  /[         ]\\  "],
    evolucionado: ["  *[o     o]*  ", "  *[   U   ]*  ", "  *[         ]*  "],
    ascendido:    ["*[o   o]*", "*[ U   ]*", "*[     ]*"]
  },

  "Cocodrilo": {
    huevo:        EGG,
    bebe:         [" ^^^", "(oO)", "---- "],
    joven:        ["  ^^^^  ", " (o   O) ", " ------  "],
    adulto:       ["   ^^^^^^^^   ", "  (o       O)  ", "  ----------   "],
    evolucionado: ["  *^^^^^^^^*  ", "  *(o     O)*  ", "  *--------*   "],
    ascendido:    ["*^^^^^*  ", "*(o  O)*  ", "*------* "]
  },

  "Serpiente": {
    huevo:        EGG,
    bebe:         [" (o) ", "  ~  ", "  ~  "],
    joven:        ["  (oo)  ", "  ~~~~  ", "  ~~~~  "],
    adulto:       ["   (ooo)   ", "   ~~~~~~   ", "   ~~~~~~   ", "    ~~~~    "],
    evolucionado: ["  *(ooo)*  ", "  *~~~~~~*  ", "  *~~~~~~*  "],
    ascendido:    ["*(ooo)*", "*~~~~* ", "*~~~~* "]
  },

  "Murciélago": {
    huevo:        EGG,
    bebe:         ["v(o)v", " (_) "],
    joven:        ["  vv(o)vv  ", "   (   )   "],
    adulto:       ["   vvv(o)vvv   ", "    (       )    "],
    evolucionado: ["  *vvv(o)vvv*  ", "  * (     ) *  "],
    ascendido:    ["*vv(o)vv*", "*( ___ )*"]
  },

  "Halcón": {
    huevo:        EGG,
    bebe:         ["  >*<  ", " (>.o) "],
    joven:        ["  >***<  ", " (>   o) ", "   v v   "],
    adulto:       ["   >*****<   ", "  (>     o)  ", "   v       v   "],
    evolucionado: ["  *>*****<*  ", "  *(>   o)*  ", "   *v     v*   "],
    ascendido:    ["*>***<*", "*(> o)*", "* v  v *"]
  },

  "Toro": {
    huevo:        EGG,
    bebe:         [") (", "(o)", "/ \\ "],
    joven:        [" )   ( ", "(o     o)", "  \\ _ /  "],
    adulto:       ["  )     (  ", " (o       o) ", "  \\         /  "],
    evolucionado: ["  *)     (*  ", "*(o       o)*", " *\\       /* "],
    ascendido:    ["*)   (*", "*(o o)*", "*\\ _ /*"]
  },

  // ── EPICOS ───────────────────────────────────────────────────────

  "Dragón de Agua": {
    huevo:        EGG,
    bebe:         ["  /=\\  ", " (~o~) ", "  ~~~  "],
    joven:        ["  /==\\  ", " (~~ o ~~) ", "  ~~~~~~~  "],
    adulto:       ["   /===\\   ", "  (~~~o~~~)  ", "  /~~~~~~~\\  "],
    evolucionado: ["  */===\\*  ", "*(~~~o~~~)*", "*~~~~~~~~~*"],
    ascendido:    ["*#/===\\#*", "*(~~o~~)*  ", "*~~~~~~~*  "]
  },

  "Grifo": {
    huevo:        EGG,
    bebe:         ["  >*<  ", " (o/O) ", "  | |  "],
    joven:        ["  >***<  ", " ( o/O ) ", "  |   |  "],
    adulto:       ["   >*****<   ", "  (  o/O  )  ", "  /|       |\\  "],
    evolucionado: ["  *>*****<*  ", " *(  */O  )*  ", " *|         |* "],
    ascendido:    ["*>***<*  ", "*(o/O)*  ", "*|   |*  "]
  },

  "Fénix Joven": {
    huevo:        EGG,
    bebe:         ["  *v*  ", " (^o^) ", "  ) (  "],
    joven:        ["  *vvv*  ", " ( ^o^ ) ", "  )   (  ", "  *   *  "],
    adulto:       ["   *vvvvv*   ", "  (  ^o^  )  ", "  )         (  ", "  ***     ***  "],
    evolucionado: ["  **vvvvv**  ", " *(  ^*^  )*  ", " *)         (* ", " *****   *****  "],
    ascendido:    ["**vvvvv**", "*(^*^)*  ", "*)**(* "]
  },

  "Unicornio": {
    huevo:        EGG,
    bebe:         [" |", "(o)", " U "],
    joven:        ["  |  ", " (o) ", "  U  "],
    adulto:       ["   |   ", "  (o)  ", " /   \\ ", "  U U  "],
    evolucionado: ["  *|*  ", " *(o)* ", " */   \\* ", "  *U U*  "],
    ascendido:    ["*|*", "*()*", "*U*"]
  },

  "Kitsune": {
    huevo:        EGG,
    bebe:         ["/\\ /\\", "(^.^)", "\\___/"],
    joven:        ["/\\  /\\  /\\", "( ^   ^ )", "  \\___/  "],
    adulto:       ["/\\  /\\  /\\  /\\  /\\", "(   ^       ^   )", "   \\___________/   "],
    evolucionado: ["*/\\  /\\  /\\  /\\  /\\*", "*(   ^       ^   )*", " *\\___________/* "],
    ascendido:    ["*/\\ /\\ /\\*", "*(^   ^)*  ", "*\\ ___ /*  "]
  },

  "Basilisco": {
    huevo:        EGG,
    bebe:         [" (!) ", "(o.o)", "~~~~"],
    joven:        ["  (!)  ", " (o   o) ", "  ~~~~~~  "],
    adulto:       ["   (!)   ", "  (o     o)  ", "  /~~~~~~~~\\  "],
    evolucionado: ["  *(!)* ", "*(o     o)*", "*\\~~~~~~/*"],
    ascendido:    ["*(!)* ", "*(o.o)*", "*~~~~*"]
  },

  "Wyvern": {
    huevo:        EGG,
    bebe:         ["  ^v^  ", " (o.o) ", "  \\ /  "],
    joven:        ["  ^vvv^  ", " ( o.o ) ", "  \\   /  "],
    adulto:       ["   ^vvvvv^   ", "  (  o.o  )  ", "   \\       /   "],
    evolucionado: ["  *^vvvvv^*  ", " *(  *.* )*  ", "  *\\     /*  "],
    ascendido:    ["*^vvv^*", "*(o.o)*", "*\\   /*"]
  },

  "Golem": {
    huevo:        EGG,
    bebe:         [" [#] ", "[o o]", "[___]"],
    joven:        ["  [###]  ", " [o     o] ", " [_______] "],
    adulto:       ["   [#####]   ", "  [o         o]  ", "  [___________]  "],
    evolucionado: ["  *[#####]*  ", " *[o       o]* ", " *[_________]*"],
    ascendido:    ["*[###]*  ", "*[o o]*  ", "*[___]*  "]
  },

  "Ent": {
    huevo:        EGG,
    bebe:         ["  Y  ", "(o o)", " ||| "],
    joven:        ["  YY  ", " (o  o) ", "  ||||  "],
    adulto:       ["   YYY   ", "  (o    o)  ", "  |||||||  "],
    evolucionado: ["  *YYY*  ", "*(o    o)*", "*|||||||||*"],
    ascendido:    ["*YYY*", "*(o)*", "*|||*"]
  },

  "Kraken Bebé": {
    huevo:        EGG,
    bebe:         ["  (o)  ", " ~~~~~ "],
    joven:        ["   (oo)   ", "  ~~~~~~~  "],
    adulto:       ["    (ooo)    ", "  ~~~~~~~~~~ "],
    evolucionado: ["  *(ooo)*  ", "  *~~~~~~~~~*  "],
    ascendido:    ["*(ooo)*", "*~~~~~*"]
  },

  "Manticora": {
    huevo:        EGG,
    bebe:         ["  >!<  ", " (o.o) "],
    joven:        ["  >!!!<  ", " ( o.o ) ", "   |!|   "],
    adulto:       ["   >!!!!!<   ", "  (  o.o  )  ", "   |!!!!!|   "],
    evolucionado: ["  *>!!!!!<*  ", " *(  *.* )*  ", "  *|!!!!!|*  "],
    ascendido:    ["*>!!!<*", "*(o.o)*", "* |!| *"]
  },

  "Pegaso de Viento": {
    huevo:        EGG,
    bebe:         ["  ~v~  ", " (o.o) "],
    joven:        ["  ~vvv~  ", " ( o.o ) ", "   ~v~   "],
    adulto:       ["   ~vvvvv~   ", "  (  o.o  )  ", "   ~~~v~~~   "],
    evolucionado: ["  *~vvvvv~*  ", "  *(o   o)*  ", "  *~~~v~~~*  "],
    ascendido:    ["*~vvv~*", "*(o.o)*", "*~v~*  "]
  },

  "Gárgola": {
    huevo:        EGG,
    bebe:         ["  (o)  ", " [V V] "],
    joven:        ["   (o)   ", "  [V   V]  ", "   [   ]   "],
    adulto:       ["    (o)    ", "   [V     V]   ", "   [         ]   "],
    evolucionado: ["   *(o)*   ", "  *[V   V]*  ", "  *[       ]*  "],
    ascendido:    ["*(o)*  ", "*[VV]*  ", "*[ ]*  "]
  },

  "Minotauro": {
    huevo:        EGG,
    bebe:         [") (", "(o)", "| |"],
    joven:        [")   (", "(o  o)", "|     |"],
    adulto:       [")       (", "(o       o)", "/|           |\\"],
    evolucionado: ["*)       (*", "*(o       o)*", "*|           |*"],
    ascendido:    ["*)  (*", "*(oo)*", "*| |*"]
  },

  // ── LEGENDARIOS ──────────────────────────────────────────────────

  "Dragón de Fuego": {
    huevo:        EGG,
    bebe:         ["  )*(  ", " (>o<) ", "  ) (  "],
    joven:        ["  )***(  ", " (> o <) ", "  )   (  "],
    adulto:       ["   )*****( ", "  (>   o   <)  ", "   )         (   ", "   ***     ***   "],
    evolucionado: ["  *)*****(*", "*(>  *  <)*", "*)         (*", "***       ***"],
    ascendido:    ["**)*****(**", "*(>  *  <)*", "**)       (**", "****     ****"]
  },

  "Pegaso": {
    huevo:        EGG,
    bebe:         ["  ^v^  ", " (o,o) ", "  | |  "],
    joven:        ["  ^vvvv^  ", " (  o,o  ) ", "  |      |  "],
    adulto:       ["   ^vvvvvv^   ", "  (   o,o   )  ", "  /|           |\\  "],
    evolucionado: ["  *^vvvvvv^*  ", " *(   >,<   )*  ", " *|           |*  "],
    ascendido:    ["**^vvvvv^**", "*(  >,<  )*", "*\\       /*"]
  },

  "Quimera": {
    huevo:        EGG,
    bebe:         ["  $%$  ", " (@.#) "],
    joven:        ["  $%$%$  ", " (@   #) ", "   | | |   "],
    adulto:       ["   $%$%$%$   ", "  (@     #)  ", "  |         |  "],
    evolucionado: ["  *$%$%$%$*  ", " *(@     #)*  ", " *|         |*  "],
    ascendido:    ["*$%$%$*", "*(@.#)*", "* ||| *"]
  },

  "Leviatán": {
    huevo:        EGG,
    bebe:         [" ~~o~~ "],
    joven:        ["  ~~~~o~~~~  "],
    adulto:       ["   ~~~~~~~~o~~~~~~~~   "],
    evolucionado: ["  *~~~~~~~~o~~~~~~~~*  "],
    ascendido:    ["*~~~~~~o~~~~~~*"]
  },

  "Cerbero": {
    huevo:        EGG,
    bebe:         ["  3(o)3  ", "  ( w )  "],
    joven:        ["  3(o o)3  ", "  (  w  )  ", "   |   |   "],
    adulto:       ["   3(o   o)3   ", "   (   w   )   ", "  /|           |\\  "],
    evolucionado: ["  *3(o   o)3*  ", "  *(   w   )*  ", "  *|           |*  "],
    ascendido:    ["*3(o o)3*", "*(  w  )*", "*\\ ___ /*"]
  },

  "Kraken Mayor": {
    huevo:        EGG,
    bebe:         ["  (OO)  ", " ~~~~~~ "],
    joven:        ["   (OO)   ", "  ~~~~~~~~  ", "  ~~~~~~~~  "],
    adulto:       ["    (OOO)    ", "  ~~~~~~~~~~~ ", "  ~~~~~~~~~~~  ", "  ~~~~~~~~~~~  "],
    evolucionado: ["  *(OOO)*  ", "  *~~~~~~~~~~~*  ", "  *~~~~~~~~~~~*  "],
    ascendido:    ["*(OOO)*  ", "*~~~~~~*  ", "*~~~~~~*  "]
  },

  "Hidra": {
    huevo:        EGG,
    bebe:         ["  s(o)s  ", "  | | |  "],
    joven:        ["  S(o o)S  ", "  | |   | |  "],
    adulto:       ["   S(o   o)S   ", "   | |     | |   "],
    evolucionado: ["  *S(o   o)S*  ", "  *| |     | |*  "],
    ascendido:    ["*S(ooo)S*", "*| | | |*"]
  },

  "Dragón de Hielo": {
    huevo:        EGG,
    bebe:         ["  *.*  ", " (*o*) ", "  ~ ~  "],
    joven:        ["  *.**.*  ", " (* o *) ", "  ~   ~  "],
    adulto:       ["   *.****.*   ", "  (*  o  *)  ", "  ~         ~  "],
    evolucionado: ["  **.*****.**  ", " *(*  *  *)*  ", " *~         ~*  "],
    ascendido:    ["**.*****.**", "*(*  *  *)*", "*~       ~*"]
  },

  "Dragón de Tormenta": {
    huevo:        EGG,
    bebe:         ["  ~Z~  ", " (~o~) "],
    joven:        ["  ~ZZZ~  ", " (~ o ~) ", "  ~   ~  "],
    adulto:       ["   ~ZZZZZ~   ", "  (~  o  ~)  ", "   ~       ~   "],
    evolucionado: ["  *~ZZZZZ~*  ", " *(~  *  ~)*  ", "  *~       ~*  "],
    ascendido:    ["*~ZZZZZ~*", "*(~*~)*  ", "*~   ~*  "]
  },

  "Odin's Lobo": {
    huevo:        EGG,
    bebe:         ["  /R\\  ", " (o.o) "],
    joven:        ["  /RRR\\  ", " ( o.o ) "],
    adulto:       ["   /RRRRR\\   ", "  (  o.o  )  "],
    evolucionado: ["  */RRRRR\\*  ", " *(  *.* )*  "],
    ascendido:    ["*/RRRRR\\*", "*( *.* )*"]
  },

  "Esfinge": {
    huevo:        EGG,
    bebe:         ["  ?  ", "(@.@)", " ??? "],
    joven:        ["   ???   ", "  (@.@)  ", "  |   |  "],
    adulto:       ["    ?????    ", "   (@   @)   ", "  /|       |\\  "],
    evolucionado: ["  *?????*  ", " *(@   @)*  ", " *|       |*  "],
    ascendido:    ["*?????*", "*(@.@)*", "*\\ _ /*"]
  },

  "Yeti": {
    huevo:        EGG,
    bebe:         ["  #o#  ", " (   ) "],
    joven:        ["  ###  ", " (o   o) ", "  |   |  "],
    adulto:       ["  #####  ", " (o     o) ", " /|         |\\ "],
    evolucionado: ["  *#####*  ", "*(o     o)*", "*|         |*"],
    ascendido:    ["*#####*", "*(o o)*", "*(   )*"]
  },

  "Wendigo": {
    huevo:        EGG,
    bebe:         ["  W  ", "(o o)", "  |  "],
    joven:        ["  WWW  ", " (o   o) ", "  |   |  "],
    adulto:       ["   WWWWW   ", "  (o       o)  ", "  |           |  "],
    evolucionado: ["  *WWWWW*  ", "*(o       o)*", "*|           |*"],
    ascendido:    ["*WWWWW*  ", "*(o   o)*  ", "*(     )*  "]
  },

  "Fénix Maduro": {
    huevo:        EGG,
    bebe:         ["  *v*  ", " (^o^) "],
    joven:        ["  *vvv*  ", " ( ^o^ ) ", "  )   (  "],
    adulto:       ["   *vvvvvvv*   ", "  (  ^ o ^  )  ", "  )           (  ", "  **         **  "],
    evolucionado: ["  **vvvvvvv**  ", " *( ^ * ^ )*  ", " *)           (*  ", " **           **  "],
    ascendido:    ["***vvvvvvv***", "*(^  *  ^)*  ", "**)       (**  ", "****     ****  "]
  },

  "Dragón de Tierra": {
    huevo:        EGG,
    bebe:         ["  /+\\  ", " (+o+) "],
    joven:        ["  /+++\\  ", " (+ o +) ", "  +   +  "],
    adulto:       ["   /+++++\\   ", "  (+  o  +)  ", "   +       +   "],
    evolucionado: ["  */+++++\\*  ", " *(+  *  +)*  ", "  *+       +*  "],
    ascendido:    ["*/+++++\\*", "*(+ * +)*", "*+     +*"]
  },

  // ── MITICOS ──────────────────────────────────────────────────────

  "Dragón Celestial": {
    huevo:        EGG,
    bebe:         ["  *~*  ", " (~O~) ", "  ~~~  "],
    joven:        ["  *~~~*  ", " (~ O ~) ", "  ~~~~~  "],
    adulto:       ["   *~~~~~*   ", "  (~~O~~)  ", "  ~~~~~~~~~~~  ", "  ***     ***  "],
    evolucionado: ["  **~~~~~**  ", "*(~~ * ~~)*", "*)~~~~~~~~~~(*", "***         ***"],
    ascendido:    ["***~~~~~***", "*(~~*~~)*  ", "**)~~~~~(**", "****     ****"]
  },

  "Fénix Ancestral": {
    huevo:        EGG,
    bebe:         ["  **v**  ", " (*^*) "],
    joven:        ["  **vvv**  ", " (** ^^ **) "],
    adulto:       ["   **vvvvv**   ", "  (** ^^ **)  ", "  **)   (**  ", "  ****   ****  "],
    evolucionado: ["  ***vvvvv***  ", "*(***^***)* ", "**)         (**", "****       ****"],
    ascendido:    ["****vvvvv****", "*(***^***)* ", "**)       (**  ", "*****   *****  "]
  },

  "Deidad Menor": {
    huevo:        EGG,
    bebe:         ["  |X|  ", " (XoX) "],
    joven:        ["  |XXX|  ", " (X o X) "],
    adulto:       ["   |XXXXX|   ", "  (X  o  X)  ", "  /X         X\\  "],
    evolucionado: ["  *|XXXXX|*  ", "*(X  *  X)*", "*X           X*"],
    ascendido:    ["*|XXXXX|*", "*(X * X)*", "*X     X*"]
  },

  "Titán": {
    huevo:        EGG,
    bebe:         ["  [T]  ", " [o o] "],
    joven:        ["  [TTT]  ", " [o   o] ", " [     ] "],
    adulto:       ["   [TTTTT]   ", "  [o       o]  ", " /[           ]\\  "],
    evolucionado: ["  *[TTTTT]*  ", " *[o     o]*  ", " *[         ]*  "],
    ascendido:    ["*[TTTTT]*", "*[o   o]*", "*[     ]*"]
  },

  "Behemoth": {
    huevo:        EGG,
    bebe:         ["  {B}  ", " {o o} "],
    joven:        ["  {BBB}  ", " {o   o} ", " {     } "],
    adulto:       ["   {BBBBB}   ", "  {o       o}  ", " /{           }\\  "],
    evolucionado: ["  *{BBBBB}*  ", " *{o     o}*  ", " *{         }*  "],
    ascendido:    ["*{BBBBB}*", "*{o   o}*", "*{     }*"]
  },

  "Leviatán Cósmico": {
    huevo:        EGG,
    bebe:         ["*~~O~~*"],
    joven:        ["  *~~~~~O~~~~~*  "],
    adulto:       ["   *~~~~~~~~~~O~~~~~~~~~~*   "],
    evolucionado: ["  **~~~~~~~~~~O~~~~~~~~~~**  "],
    ascendido:    ["***~~~~~~~~~~O~~~~~~~~~~***"]
  },

  "Serpiente del Mundo": {
    huevo:        EGG,
    bebe:         [" (O)  ", " ~~~~ "],
    joven:        ["  (OO)  ", "  ~~~~~~~~  "],
    adulto:       ["   (OOO)   ", "  ~~~~~~~~~~~~~  ", "  ~~~~~~~~~~~~~  "],
    evolucionado: ["  *(OOO)*  ", "  *~~~~~~~~~~~~~*  ", "  *~~~~~~~~~~~~~*  "],
    ascendido:    ["*(OOOOO)*  ", "*~~~~~~~~~~~~~*  ", "*~~~~~~~~~~~~~*  "]
  },

  "Dragón del Vacío": {
    huevo:        EGG,
    bebe:         ["  .V.  ", " (vOv) "],
    joven:        ["  .VVV.  ", " (v O v) ", "  .   .  "],
    adulto:       ["   .VVVVV.   ", "  (v  O  v)  ", "  .         .  "],
    evolucionado: ["  *.VVVVV.*  ", " *(v  *  v)*  ", "  *.       .*  "],
    ascendido:    ["*.VVVVV.*", "*(v * v)*", "*.     .*"]
  },

  "Dios Lobo": {
    huevo:        EGG,
    bebe:         ["  /G\\  ", " (o.o) "],
    joven:        ["  /GGG\\  ", " ( o.o ) "],
    adulto:       ["   /GGGGG\\   ", "  (  o.o  )  "],
    evolucionado: ["  */GGGGG\\*  ", " *(  *.* )*  "],
    ascendido:    ["*/GGGGG\\*", "*( *.* )*", "*\\___/*  "]
  },

  "Kitsune Divino": {
    huevo:        EGG,
    bebe:         ["/\\ /\\", "(*.*)"],
    joven:        ["/\\  /\\  /\\  /\\  /\\", "(*     *)", "  \\*_*/  "],
    adulto:       ["/\\  /\\  /\\  /\\  /\\  /\\  /\\  /\\  /\\", "(*           *)", "   \\*_______*/   "],
    evolucionado: ["*/\\  /\\  /\\  /\\  /\\  /\\  /\\  /\\  /\\*", "*(       *       )*", " *\\*___________/*"],
    ascendido:    ["*/\\  /\\  /\\  /\\  /\\  /\\  /\\  /\\  /\\*", "*(          *          )*", " *\\*_________________/*"]
  },

  "Unicornio Estelar": {
    huevo:        EGG,
    bebe:         [" *| ", "(*)  ", " U   "],
    joven:        ["  *|*  ", "  (*)  ", "  _U_  "],
    adulto:       ["   *|*|*   ", "   (*  *)   ", "  / _U_ \\  "],
    evolucionado: ["  **|*|**  ", "  *(*  *)*  ", " */_U_\\*   "],
    ascendido:    ["***|*|***", "*(* * *)*", "*/(_U_)\\*"]
  },

  "Grifo de Luz": {
    huevo:        EGG,
    bebe:         ["  >L<  ", " (O.O) "],
    joven:        ["  >LLL<  ", " ( O.O ) "],
    adulto:       ["   >LLLLL<   ", "  (  O.O  )  "],
    evolucionado: ["  *>LLLLL<*  ", " *(  *.* )*  "],
    ascendido:    ["*>LLLLL<*", "*(O . O)*", "* v   v *"]
  },

  "Guardián del Tiempo": {
    huevo:        EGG,
    bebe:         ["  [T]  ", " (o.o) "],
    joven:        ["  [TTT]  ", " ( o.o ) "],
    adulto:       ["   [TTTTT]   ", "  (  o.o  )  "],
    evolucionado: ["  *[TTTTT]*  ", " *(  *.* )*  "],
    ascendido:    ["*[TTTTT]*", "*(* . *)*", "*\\___/*  "]
  },

  "Anomalía Cuántica": {
    huevo:        EGG,
    bebe:         ["  ?!?  ", " (??) "],
    joven:        ["  ?!?!?  ", " (?   ?) "],
    adulto:       ["   ?!?!?!?   ", "  (?     ?)  "],
    evolucionado: ["  *?!?!?!?*  ", " *(?     ?)*  "],
    ascendido:    ["*?!?!?!?*", "*(? * ?)*"]
  },

  "Dragón del Caos": {
    huevo:        EGG,
    bebe:         ["  %X%  ", " (%X%) "],
    joven:        ["  %X%X%  ", " (% X %) "],
    adulto:       ["   %X%X%X%   ", "  (%  X  %)  "],
    evolucionado: ["  *%X%X%X%*  ", " *(%  *  %)*  "],
    ascendido:    ["*%X%X%X%*", "*(%*%*%)*", "*\\ ___ /*"]
  }
};

// ─── FALLBACK ART ──────────────────────────────────────────────────
export const FALLBACK_ART = {
  huevo:        EGG,
  bebe:         ["  (o.o)  ", "  ( Y )  "],
  joven:        ["  (o   o)  ", "  (  Y  )  "],
  adulto:       ["   (o     o)   ", "   (   Y   )   "],
  evolucionado: ["  *(o     o)*  ", "  *(   Y   )*  "],
  ascendido:    ["**(o     o)**", "**(   Y   )**"]
};

// ─── MAIN FUNCTION ─────────────────────────────────────────────────
// Returns the ASCII art lines for a given pet + stage + accessory.
export function getPetArt(species, stage, accessory = "none") {
  const speciesKey = species.trim();
  const speciesArt = PET_ASCII[speciesKey] || FALLBACK_ART;
  const stageArt = speciesArt[stage] || speciesArt["adulto"] || FALLBACK_ART["adulto"];
  const acc = ACCESSORIES[accessory] || ACCESSORIES["none"];

  // Prepend accessory top art
  return [...acc.top, ...stageArt];
}
