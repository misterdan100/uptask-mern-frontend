import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";

const Proyecto = () => {
  const { obtenerProyecto, proyecto, cargando } = useProyectos();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  const { nombre, cliente, descripcion } = proyecto;

  if(cargando) return 'Cargando...'

  return (
  <div className="flex justify-between">
      <h1 className="font-black text-4xl">{nombre}</h1>
      <Link
        to={`/proyectos/editar/${id}`}
        className="flex items-center gap-2 text-gray-400 hover:text-sky-600 hover:font-bold transition-all uppercase"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
        </svg>
        Editar
      </Link>
    </div>
  );
};

export default Proyecto;