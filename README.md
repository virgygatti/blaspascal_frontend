# Frontend - Sistema de Gestión de Libros

Este proyecto es el frontend de una aplicación web para la gestión de libros con autenticación de usuarios, desarrollado en React.js con Vite, Tailwind CSS y Axios.

---

## Requisitos

- Node.js 16+
- npm o yarn
- Backend FastAPI corriendo en `http://localhost:8000`

---

## Instalación y configuración

### 1. Entrar al directorio del frontend
```bash
cd blaspascal_frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar la aplicación en modo desarrollo
```bash
npm run dev
```

La aplicación estará disponible en: [http://localhost:5173](http://localhost:5173)

### 4. Construir para producción
```bash
npm run build
```

### 5. Vista previa de la build de producción
```bash
npm run preview
```

---

## Funcionalidades Implementadas

### 🔐 Sistema de Autenticación
- **Registro de usuarios**: Formulario completo con validaciones
  - Nombre completo
  - Correo electrónico (con validación de formato)
  - Contraseña (mínimo 6 caracteres)
  - Confirmación de contraseña
- **Inicio de sesión**: Autenticación con correo y contraseña
- **Gestión de tokens JWT**: Almacenamiento seguro en localStorage
- **Protección de rutas**: Acceso restringido a usuarios autenticados

### 📚 Gestión de Libros
- **Listado paginado**: Muestra 10 libros por página
- **Agregar libros**: Modal con formulario para nombre y descripción
- **Editar libros**: Modificación de datos existentes
- **Eliminar libros**: Confirmación antes de eliminar
- **Filtrado por usuario**: Solo muestra libros del usuario autenticado

### 🎨 Interfaz de Usuario
- **Diseño responsivo**: Adaptable a diferentes tamaños de pantalla
- **Paleta de colores pastel**: Colores suaves y agradables
- **Navegación intuitiva**: Barra de navegación con estado dinámico
- **Modales interactivos**: Para formularios y confirmaciones
- **Estados de carga**: Indicadores visuales durante operaciones

---

## Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── BookList.jsx     # Lista y gestión de libros
│   ├── BookModal.jsx    # Modal para agregar/editar libros
│   ├── DeleteConfirmModal.jsx  # Modal de confirmación
│   ├── LoginForm.jsx    # Formulario de inicio de sesión
│   ├── RegisterForm.jsx # Formulario de registro
│   └── Navbar.jsx       # Barra de navegación
├── contexts/            # Context API
│   └── AuthContext.jsx  # Gestión de estado de autenticación
├── App.jsx              # Componente principal
├── main.jsx             # Punto de entrada
└── index.css            # Estilos globales
```

---

## Tecnologías Utilizadas

### Core
- **React 19.1.0**: Biblioteca para interfaces de usuario
- **Vite 7.0.4**: Herramienta de construcción rápida
- **React Router DOM 7.7.1**: Enrutamiento de la aplicación

### UI/UX
- **Tailwind CSS 3.4.3**: Framework de CSS utilitario
- **Headless UI 2.2.6**: Componentes de interfaz accesibles
- **Heroicons 2.2.0**: Iconografía

### HTTP y Estado
- **Axios 1.11.0**: Cliente HTTP para llamadas al backend
- **Context API**: Gestión de estado global de autenticación

---

## Configuración del Backend

### URL del Backend
Por defecto, la aplicación se conecta a `http://localhost:8000`. Si necesitas cambiar esta URL:

1. Busca todas las llamadas a `axios` en los componentes
2. Reemplaza `http://localhost:8000` con tu URL del backend

### Endpoints Utilizados
- `POST /register` - Registro de usuarios
- `POST /login` - Autenticación de usuarios
- `GET /libros` - Listar libros (con paginación)
- `POST /libros` - Crear nuevo libro
- `PUT /libros/{id}` - Actualizar libro
- `DELETE /libros/{id}` - Eliminar libro

---

## Características Técnicas

### Gestión de Estado
- **Context API**: Para estado global de autenticación
- **useState**: Para estado local de componentes
- **useEffect**: Para efectos secundarios y llamadas API

### Validaciones
- **Frontend**: Validaciones en tiempo real de formularios
- **Backend**: Validaciones de seguridad y integridad de datos
- **Manejo de errores**: Mensajes específicos para diferentes tipos de errores

### Seguridad
- **Tokens JWT**: Almacenamiento seguro en localStorage
- **Headers de autorización**: Incluidos automáticamente en todas las llamadas
- **Protección de rutas**: Redirección automática para usuarios no autenticados

### Responsividad
- **Mobile-first**: Diseño optimizado para dispositivos móviles
- **Breakpoints**: Adaptación a tablets y desktop
- **Componentes flexibles**: Uso de Flexbox y Grid

---

## Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run preview      # Vista previa de la build de producción
npm run lint         # Ejecuta el linter para verificar código
```

---

## Notas de Desarrollo

### Estructura de Componentes
- **Componentes funcionales**: Uso de hooks de React
- **Separación de responsabilidades**: Cada componente tiene una función específica
- **Reutilización**: Componentes modales reutilizables

### Estilos
- **Tailwind CSS**: Clases utilitarias para estilos
- **Diseño consistente**: Paleta de colores unificada
- **Componentes accesibles**: Cumplimiento de estándares de accesibilidad

### Optimizaciones
- **Lazy loading**: Carga diferida de componentes
- **Manejo eficiente de estado**: Actualizaciones optimizadas
- **Caché de tokens**: Persistencia de sesión

---

## Solución de Problemas

### Error de Conexión al Backend
1. Verifica que el backend esté corriendo en `http://localhost:8000`
2. Revisa la consola del navegador para errores de CORS
3. Confirma que el backend tenga CORS configurado correctamente

### Problemas de Autenticación
1. Verifica que el token se esté guardando en localStorage
2. Revisa que las credenciales sean correctas
3. Confirma que el backend esté generando tokens válidos

### Errores de Build
1. Ejecuta `npm install` para reinstalar dependencias
2. Verifica la versión de Node.js (requiere 16+)
3. Limpia la caché: `npm run build -- --force`

---

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
