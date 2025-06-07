export const guadarEnStorage = (clave, valor) => {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    console.log("error al guardar en localstorage:", error);
  }
};

export const obtenerDeStorage = (clave) => {
  try {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : null;
  } catch (error) {
    console.log("error al obtener de localStorage;", error);
    return null;
  }
};

export const eliminarDeStorage = (clave) => {
  try {
    localStorage.removeItem(clave);
  } catch (error) {
    console.error("error al eliminar de localstorage:", error);
  }
};
