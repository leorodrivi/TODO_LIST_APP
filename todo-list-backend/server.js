const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Datos en memoria (para pruebas)
let tareas = [
  { id: 1, texto: "Estudiar React", completada: false },
  { id: 2, texto: "Practicar JavaScript", completada: true },
  { id: 3, texto: "Crear proyecto Todo List", completada: false }
];

// Rutas de la API
app.get('/api/tareas', (req, res) => {
  console.log('GET /api/tareas - Enviando', tareas.length, 'tareas');
  res.json(tareas);
});

app.post('/api/tareas', (req, res) => {
  const { texto } = req.body;
  
  if (!texto || texto.trim() === '') {
    return res.status(400).json({ error: 'El texto es requerido' });
  }

  const nuevaTarea = {
    id: Date.now(),
    texto: texto.trim(),
    completada: false
  };

  tareas.push(nuevaTarea);
  
  console.log('POST /api/tareas - Tarea agregada:', nuevaTarea);
  res.json(nuevaTarea);
});

app.put('/api/tareas/:id', (req, res) => {
  const { id } = req.params;
  const { completada } = req.body;

  const tareaIndex = tareas.findIndex(t => t.id == id);
  
  if (tareaIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tareas[tareaIndex].completada = completada;
  
  console.log('PUT /api/tareas/' + id + ' - Completada:', completada);
  res.json({ message: 'Tarea actualizada' });
});

app.delete('/api/tareas/:id', (req, res) => {
  const { id } = req.params;

  const tareaIndex = tareas.findIndex(t => t.id == id);
  
  if (tareaIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tareas = tareas.filter(t => t.id != id);
  
  console.log('DELETE /api/tareas/' + id + ' - Tarea eliminada');
  res.json({ message: 'Tarea eliminada' });
});

app.get('/', (req, res) => {
  res.json({ 
    message: '✅ API del Todo List funcionando!',
    endpoints: {
      'GET /api/tareas': 'Obtener todas las tareas',
      'POST /api/tareas': 'Crear nueva tarea',
      'PUT /api/tareas/:id': 'Actualizar tarea',
      'DELETE /api/tareas/:id': 'Eliminar tarea'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend ejecutándose en http://localhost:${PORT}`);
  console.log(`📡 Prueba la API: http://localhost:${PORT}/api/tareas`);
});
