/**
 * * guardar objeto en localstorage.
 * @param {string} clave string nombre del objeto a guardar
 * @param {object} objeto estructura de datos a guardar
 * @returns
 * 
 * * formato del objeto:
 * {
 *  nombre: "nombre_secuencia",
 *  algoritmo: "algoritmo_usado",
 *  tests_pasados: [],
 *  fecha_creacion: "date",
 *  cant_digitos: n,
 *  secuencia: []
 * }
 */
function guardarEnLocalStorage(clave, objeto) {

    // local storage
    const lst = window.localStorage;

    // si ya existe un guardado con la misma clave
    if (lst.getItem(clave) !== null) {
        return "ya existe una secuencia con ese nombre!";
    }

    // guardar
    try {
        // puede generar error cuando se supera el espacio del local storage
        // puede generar error cuando el usuario tiene deshabilitado el local storage
        lst.setItem(clave, JSON.stringify(objeto));
    } catch (error) {
        return error.getMessage();
    }

    return "secuencia guardada";
}

/**
 * *obtener un objeto de localstorage
 * @param {string} clave string nombre del objeto a guardar
 * @returns {object} objeto guardado
 */
function obtenerDeLocalStorage(clave) {

    // local storage
    const lst = window.localStorage;
    // obtener
    const objeto = lst.getItem(clave);

    // validacion
    if (objeto === null) {
        return "la secuencia buscada no existe!";
    }

    return JSON.parse(objeto);
}

/**
 * * obtiene todos los objetos del local storage
 * @returns array de objetos
 */
function recuperarLocalStorage() {

    // local storage
    const lst = window.localStorage;
    // array para secuencias obtenidas
    const stored = [];

    // recorrer por clave y obtener objetos
    for (const clave in lst) {
        if (Object.hasOwnProperty.call(lst, clave)) {
            const element = lst[clave];
            stored.push(JSON.parse(element));
        }
    }

    return stored;
}

function eliminarDelLocalStorage(clave) {
 
    // local storage
    const lst = window.localStorage;

    lst.removeItem(clave);

    return;
}