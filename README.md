# Todo List App - Full Stack

Una aplicación completa de lista de tareas construida con React + Vite en el frontend y Express.js en el backend.

## 🚀 Características

- ✅ Crear, editar y eliminar tareas
- ✅ Marcar tareas como completadas
- ✅ Interfaz moderna y responsive
- ✅ API RESTful completa
- ✅ Almacenamiento en memoria

## 🛠️ Tecnologías

**Frontend:** React, Vite, ESLint  
**Backend:** Express.js, CORS, Nodemon

## 📦 Instalación

### Backend
```bash
cd backend
npm install
npm run dev
```
Servidor en: `http://localhost:3001`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Aplicación en: `http://localhost:5173`

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/tareas` | Obtener todas las tareas |
| `POST` | `/api/tareas` | Crear nueva tarea |
| `PUT` | `/api/tareas/:id` | Actualizar tarea |
| `DELETE` | `/api/tareas/:id` | Eliminar tarea |

### Ejemplo de uso:
```bash
# Crear tarea
curl -X POST http://localhost:3001/api/tareas \
  -H "Content-Type: application/json" \
  -d '{"texto": "Mi nueva tarea"}'
```

## 🎯 Funcionalidades

- **Tareas iniciales** incluidas como ejemplo
- **Validación** para evitar tareas vacías
- **Estado visual** diferenciado para tareas completadas
- **Logs detallados** en el servidor

## 🔧 Scripts Principales

**Backend:**
- `npm start` - Producción
- `npm run dev` - Desarrollo con Nodemon

**Frontend:**
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run lint` - Verificación de código

## 📝 Notas

- Los datos se almacenan en memoria (se pierden al reiniciar)
- CORS configurado para desarrollo
- Para producción, considerar base de datos persistente

---

**¡Organiza tus tareas eficientemente!** 🎉