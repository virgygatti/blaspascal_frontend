import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const BookModal = ({ isOpen, onClose, onSave, book = null, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book && mode === 'edit') {
      setFormData({
        nombre: book.nombre,
        descripcion: book.descripcion
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: ''
      });
    }
    setErrors({});
  }, [book, mode, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const getModalTitle = () => {
    if (mode === 'edit' && book) {
      return `Modificar libro: ${book.nombre}`;
    }
    return mode === 'add' ? 'Agregar Libro' : 'Editar Libro';
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-blue-50 rounded-lg p-6 shadow-xl w-full max-w-lg mx-auto">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Cerrar</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                      {getModalTitle()}
                    </Dialog.Title>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre:
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                            errors.nombre ? 'border-rose-400' : 'border-gray-300'
                          }`}
                          placeholder="Nombre del libro"
                        />
                        {errors.nombre && (
                          <p className="text-rose-500 text-sm mt-1">{errors.nombre}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                          Descripción:
                        </label>
                        <textarea
                          id="descripcion"
                          name="descripcion"
                          value={formData.descripcion}
                          onChange={handleChange}
                          rows="3"
                          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                            errors.descripcion ? 'border-rose-400' : 'border-gray-300'
                          }`}
                          placeholder="Descripción del libro"
                        />
                        {errors.descripcion && (
                          <p className="text-rose-500 text-sm mt-1">{errors.descripcion}</p>
                        )}
                      </div>
                      <div className="mt-5 flex justify-end space-x-3">
                        <button
                          type="submit"
                          className="bg-blue-300 text-blue-800 px-4 py-2 rounded hover:bg-blue-400 font-medium"
                        >
                          {mode === 'add' ? 'Agregar' : 'Actualizar datos'}
                        </button>
                        <button
                          type="button"
                          className="bg-blue-50 text-gray-900 px-4 py-2 rounded hover:bg-blue-100 font-medium"
                          onClick={onClose}
                        >
                          Cerrar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BookModal; 