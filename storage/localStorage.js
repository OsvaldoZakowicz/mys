/**
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
    if (obtenerDeLocalStorage(clave) !== null) {
        return "ya existe una secuencia con ese nombre!";
    }
    // guardado
    lst.setItem(clave, JSON.stringify(objeto));
    return "secuencia guardada";
}

/**
 * 
 * @param {string} clave string nombre del objeto a guardar
 * @returns {object} objeto guardado
 */
function obtenerDeLocalStorage(clave) {
    // local storage
    const lst = window.localStorage;
    // obtension
    const objeto = lst.getItem(clave);
    return objeto;
}