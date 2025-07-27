import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BookModal from './BookModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import axios from 'axios';

const BookList = () => {
  const { token } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);

  const booksPerPage = 10;

  const fetchBooks = async (page = 0) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/libros?skip=${page * booksPerPage}&limit=${booksPerPage}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setBooks(response.data.books);
      setTotalBooks(response.data.total);
    } catch (error) {
      setError(error.response?.data?.detail || 'Error al cargar los libros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage, token]);

  const handleAddBook = async (bookData) => {
    try {
      await axios.post('http://localhost:8000/libros', bookData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      await fetchBooks(currentPage);
    } catch (error) {
      setError(error.response?.data?.detail || 'Error al agregar el libro');
    }
  };

  const handleEditBook = async (bookData) => {
    try {
      await axios.put(`http://localhost:8000/libros/${selectedBook.id}`, bookData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      await fetchBooks(currentPage);
    } catch (error) {
      setError(error.response?.data?.detail || 'Error al actualizar el libro');
    }
  };

  const handleDeleteBook = async () => {
    try {
      await axios.delete(`http://localhost:8000/libros/${bookToDelete.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      await fetchBooks(currentPage);
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    } catch (error) {
      setError(error.response?.data?.detail || 'Error al eliminar el libro');
    }
  };

  const openEditModal = (book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Cargando libros...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Listado de Libros</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-300 text-blue-800 rounded-md hover:bg-blue-400 transition-colors font-medium"
        >
          + Agregar
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-rose-100 border border-rose-300 text-rose-700 rounded">
          {error}
        </div>
      )}

      <div className="bg-blue-50 shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-blue-50 divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-left">
                  {book.nombre}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 text-left">
                  {book.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(book)}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Modificar
                    </button>
                    <button
                      onClick={() => openDeleteModal(book)}
                      className="text-rose-500 hover:text-rose-700 font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {books.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No tienes libros registrados. ¡Agrega tu primer libro!
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-6">
          <nav className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-blue-50 border border-gray-300 rounded-md hover:bg-blue-100 disabled:opacity-50"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentPage === i
                    ? 'bg-blue-300 text-blue-800'
                    : 'text-gray-500 bg-blue-50 border border-gray-300 hover:bg-blue-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-blue-50 border border-gray-300 rounded-md hover:bg-blue-100 disabled:opacity-50"
            >
              Siguiente
            </button>
          </nav>
        </div>
      )}

      {/* Modales */}
      <BookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddBook}
        mode="add"
      />

      <BookModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditBook}
        book={selectedBook}
        mode="edit"
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteBook}
        bookName={bookToDelete?.nombre}
      />
    </div>
  );
};

export default BookList; 