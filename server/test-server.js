// ✅ ARCHIVO DE PRUEBA PARA VERIFICAR EL SERVIDOR EN LOCALHOST
// Ejecuta: node test-server.js
// Luego abre: http://localhost:5000

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ RUTA DE PRUEBA - ESTADO DEL SERVIDOR
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: '🌍 THE WORLD backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ✅ RUTA DE PRUEBA - HTML SIMPLE
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>🌍 THE WORLD - Test Server</title>
      <style>
        body {
          font-family: monospace;
          background: linear-gradient(135deg, #4c6346 0%, #2d3d27 100%);
          color: #e8dcc8;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          padding: 20px;
        }
        .container {
          background: #1a1a1a;
          border: 2px solid #4c6346;
          border-radius: 15px;
          padding: 40px;
          max-width: 500px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          text-align: center;
        }
        h1 {
          color: #a8d5ba;
          margin: 0 0 20px 0;
          font-size: 2em;
        }
        .status {
          background: #2a2a2a;
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
          border-left: 4px solid #a8d5ba;
        }
        .status-online {
          color: #90ee90;
          font-weight: bold;
        }
        .code {
          background: #0a0a0a;
          padding: 10px;
          border-radius: 5px;
          margin: 10px 0;
          color: #00ff00;
          font-size: 0.9em;
        }
        button {
          background: #4c6346;
          color: #e8dcc8;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-family: monospace;
          margin: 10px 5px;
          transition: all 0.3s;
        }
        button:hover {
          background: #a8d5ba;
          color: #1a1a1a;
        }
        .info {
          color: #888;
          font-size: 0.9em;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🌍 THE WORLD</h1>
        <h2>Test Server</h2>
        
        <div class="status">
          <p class="status-online">✅ Status: ONLINE</p>
          <p id="time"></p>
        </div>

        <div>
          <button onclick="testAPI()">🧪 Test API</button>
          <button onclick="viewJSON()">📋 Ver JSON</button>
        </div>

        <div id="result"></div>

        <div class="info">
          <p>Servidor ejecutándose en localhost:5000</p>
          <p>Para detener: Ctrl+C en la terminal</p>
        </div>
      </div>

      <script>
        // Actualizar hora en tiempo real
        function updateTime() {
          const now = new Date().toLocaleTimeString('es-ES');
          document.getElementById('time').textContent = 'Hora: ' + now;
        }
        setInterval(updateTime, 1000);
        updateTime();

        // Test API
        async function testAPI() {
          try {
            const response = await fetch('/api/status');
            const data = await response.json();
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<div class="code"><pre>' + JSON.stringify(data, null, 2) + '</pre></div>';
          } catch (error) {
            document.getElementById('result').innerHTML = '<p style="color: red;">❌ Error: ' + error.message + '</p>';
          }
        }

        // View JSON
        function viewJSON() {
          testAPI();
        }
      </script>
    </body>
    </html>
  `);
});

// ❌ CAPTURA DE ERRORES
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// ✅ INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║  🌍 THE WORLD - TEST SERVER        ║');
  console.log('╠══════════════════════════════════════╣');
  console.log(`║  ✅ Servidor corriendo en puerto:   ║`);
  console.log(`║     http://localhost:${PORT}${PORT === 5000 ? '          ' : '         '} ║`);
  console.log('║                                      ║');
  console.log('║  Abre la URL en tu navegador:        ║');
  console.log(`║     http://localhost:${PORT}${PORT === 5000 ? '' : ' '}              ║`);
  console.log('║                                      ║');
  console.log('║  Para detener: Ctrl+C                ║');
  console.log('╚══════════════════════════════════════╝\n');
});

// Manejo de Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n👋 Servidor detenido.');
  process.exit(0);
});
