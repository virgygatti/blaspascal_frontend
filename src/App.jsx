import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BookList from './components/BookList';
import './App.css';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Componente para la página de inicio
const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenido al Gestor de Libros
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {isAuthenticated 
              ? 'Gestiona tu biblioteca personal de manera fácil y eficiente.'
              : 'Inicia sesión para comenzar a gestionar tu biblioteca personal.'
            }
          </p>
          {!isAuthenticated && (
            <div className="mt-8 space-y-4">
              <p className="text-gray-500">
                ¿No tienes una cuenta? Regístrate para comenzar.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2 bg-blue-300 text-blue-800 rounded-md hover:bg-blue-400 transition-colors font-medium"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-6 py-2 bg-emerald-300 text-emerald-800 rounded-md hover:bg-emerald-400 transition-colors font-medium"
                >
                  Registrarse
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal de la aplicación
const AppContent = () => {
  return (
    <Router>
      <div className="min-h-screen bg-blue-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route 
            path="/libros" 
            element={
              <ProtectedRoute>
                <BookList />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

// Componente raíz con AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
