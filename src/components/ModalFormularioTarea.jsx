import { Fragment, useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Dialog, Transition } from "@headlessui/react";
import useProyectos from "../hooks/useProyectos";
import Alerta from '../components/Alerta'

const PRIORIDAD = ["Baja", "Media", "Alta"];

const ModalFormularioTarea = () => {
  const [id, setId] = useState("")
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");

  const params = useParams()


  const { modalFormularioTarea, handleModalTarea, mostrarAlerta, alerta, submitTarea, tarea } = useProyectos();

  useEffect(() => {
    if(tarea?._id) {
      setId(tarea._id)
      setNombre(tarea.nombre)
      setDescripcion(tarea.descripcion)
      setPrioridad(tarea.prioridad)
      setFechaEntrega(tarea.fechaEntrega?.split('T')[0])
      return
    }
    setId('')
    setNombre('')
    setDescripcion('')
    setPrioridad('')
    setFechaEntrega('')
  }, [tarea])

  const handleSubmit = async e => {
    e.preventDefault()

    if([ nombre, descripcion, prioridad, fechaEntrega ].includes('')) {
        mostrarAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
        })
        return
    }

    await submitTarea({id, nombre, descripcion, prioridad, fechaEntrega, proyecto: params.id})

    setId('')
    setNombre('')
    setDescripcion('')
    setPrioridad('')
    setFechaEntrega('')

  }

  return (
    <Transition.Root show={modalFormularioTarea} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalTarea}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  onClick={handleModalTarea}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center leading-6 font-bold text-gray-900"
                  >
                    {id ? 'Editar Tarea' : 'Crear Tarea'}
                  </Dialog.Title>

                  {alerta.msg && <Alerta alerta={alerta}/>}

                  <form 
                  onSubmit={handleSubmit}
                  className="my-10"
                  >
                    <div className="mb-5">
                      <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Nombre Tarea
                      </label>

                      <input
                        type="text"
                        id="nombre"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre de la tarea"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="descripcion"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Descripcion Tarea
                      </label>

                      <textarea
                        type="text"
                        id="descripcion"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Descripcion de la tarea"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="fecha-entrega"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Fecha de Entrega
                      </label>

                      <input
                        type="date"
                        id="fecha-entrega"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fechaEntrega}
                        onChange={(e) => setFechaEntrega(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="prioridad"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Prioridad
                      </label>

                      <select
                        type="text"
                        id="prioridad"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                      >
                        <option value="" disabled>
                          -- Seleccionar --
                        </option>
                        {PRIORIDAD?.map((prioridad) => (
                          <option key={prioridad} value={prioridad}>
                            {prioridad}
                          </option>
                        ))}
                      </select>
                    </div>

                    

                    <input
                      type="submit"
                      alue={"Crear Tarea"}
                      className={`${id ? 'bg-amber-600 hover:bg-amber-700' : 'bg-sky-600 hover:bg-sky-700'} w-full text-white p-3 uppercase font-bold cursor-pointer transition rounded-lg text-sm`}
                      value={`${id ? 'Guardar Cambios' : 'Crear Tarea'}`}
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormularioTarea;
