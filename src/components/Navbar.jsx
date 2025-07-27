import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMyBooks = () => {
    navigate('/libros');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 shadow-lg py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-blue-800 drop-shadow-lg select-none">
          <span className="inline-block align-middle mr-2">📚</span>Gestor de Libros
        </h1>
        <div className="flex gap-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleMyBooks}
                className="px-5 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold shadow hover:bg-blue-100 transition-colors border border-blue-200"
              >
                Mis Libros
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-rose-300 text-rose-800 font-semibold shadow hover:bg-rose-400 transition-colors border border-rose-400"
              >
                Desconectar
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 rounded-lg bg-emerald-300 text-emerald-800 font-semibold shadow hover:bg-emerald-400 transition-colors border border-emerald-400"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 