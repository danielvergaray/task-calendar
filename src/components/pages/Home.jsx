import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonCreator from "../Reutilizables/ButtonCreator";

const Home = () => {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error del servidor: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        // Esperar 3 segundos antes de mostrar los datos
        setTimeout(() => {
          setApiData(data);
          setIsLoading(false);
        }, 3000); // 3000 ms = 3 segundos
      })
      .catch((err) => setError(err.message));
    //.finally(() => setIsLoading(false));
  }, []);

  /*  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Error del servidor: " + response.status);
        }

        const data = await response.json();

        setTimeout(() => {
          setApiData(data);
          setIsLoading(false);
        }, 3000);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    obtenerDatos();
  }, []); */

  /* useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // Axios ya convierte JSON automáticamente
        setTimeout(() => {
          setApiData(response.data);
          setIsLoading(false);
        }, 3000); // espera 3 segundos
      })
      .catch((err) => {
        setTimeout(() => {
          setError(err.message);
          setIsLoading(false);
        }, 3000);
      });
  }, []); */

  /* useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");

        // Axios ya convierte la respuesta en JSON, no necesitas response.json()
        const data = response.data;

        setTimeout(() => {
          setApiData(data);
          setIsLoading(false);
        }, 3000);
      } catch (err) {
        setTimeout(() => {
          setError(err.message);
          setIsLoading(false);
        }, 3000);
      }
    };

    obtenerDatos();
  }, []); */

  return (
    <div className="home-section">
      <div className="home">
        <h1>Bienvenido</h1>

        <div className="home-botones">
          <Link to="registro">
            <ButtonCreator buttonContext="Registrarse" />
          </Link>

          <Link to="inicio-sesion">
            <ButtonCreator buttonContext="Iniciar sesion" />
          </Link>

          <Link to="administrador-perfiles">
            <ButtonCreator buttonContext="Administrador" />
          </Link>
        </div>
      </div>

      {isLoading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {apiData && (
        <ul>
          {apiData.map((usuario) => (
            <li key={usuario.id}>{usuario.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
