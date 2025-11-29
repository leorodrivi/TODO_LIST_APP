// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [filtro, setFiltro] = useState('todas'); // 'todas', 'completadas', 'pendientes'

  // Cargar tareas al iniciar
  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tareas');
      const data = await response.json();
      setTareas(data);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  };

  const agregarTarea = async () => {
    if (nuevaTarea.trim() === '') return;
    
    try {
      const response = await fetch('http://localhost:3001/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texto: nuevaTarea,
          completada: false,
        }),
      });
      
      if (response.ok) {
        setNuevaTarea('');
        cargarTareas(); // Recargar las tareas
      }
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };

  const toggleCompletada = async (id) => {
    try {
      const tarea = tareas.find(t => t.id === id);
      await fetch(`http://localhost:3001/api/tareas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completada: !tarea.completada,
        }),
      });
      
      cargarTareas(); // Recargar las tareas
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/tareas/${id}`, {
        method: 'DELETE',
      });
      
      cargarTareas(); // Recargar las tareas
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro === 'completadas') return tarea.completada;
    if (filtro === 'pendientes') return !tarea.completada;
    return true;
  });

  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter(t => t.completada).length;
  const tareasPendientes = totalTareas - tareasCompletadas;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mi Todo List</h1>
        <p>Organiza los cursos de forma eficiente</p>
      </header>

      <div className="agregar-tarea">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..."
          onKeyPress={(e) => e.key === 'Enter' && agregarTarea()}
        />
        <button onClick={agregarTarea}>+ Agregar</button>
      </div>

      <div className="filtros">
        <button 
          className={filtro === 'todas' ? 'activo' : ''}
          onClick={() => setFiltro('todas')}
        >
          Total ({totalTareas})
        </button>
        <button 
          className={filtro === 'completadas' ? 'activo' : ''}
          onClick={() => setFiltro('completadas')}
        >
          Completadas ({tareasCompletadas})
        </button>
        <button 
          className={filtro === 'pendientes' ? 'activo' : ''}
          onClick={() => setFiltro('pendientes')}
        >
          Pendientes ({tareasPendientes})
        </button>
      </div>

      <div className="lista-tareas">
        {tareasFiltradas.map(tarea => (
          <div key={tarea.id} className={`tarea ${tarea.completada ? 'completada' : ''}`}>
            <span 
              className="checkbox"
              onClick={() => toggleCompletada(tarea.id)}
            >
              {tarea.completada ? '✓' : ''}
            </span>
            <span className="texto">{tarea.texto}</span>
            <button 
              className="eliminar"
              onClick={() => eliminarTarea(tarea.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="nota">
        <p>Nota: Pendiente Completada</p>
      </div>
    </div>
  );
}

export default App;