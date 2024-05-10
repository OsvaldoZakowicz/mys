/**
 * * retorna la categoria de un array de 5 digitos
 * @param {*} numeros array
 * @returns categoria
 */
function compararSegmento(numeros) {
    // Contar la cantidad de cada número
    const conteo = {};
    for (const numero of numeros) {
        if (conteo[numero]) {
            conteo[numero]++;
        } else {
            conteo[numero] = 1;
        }
    }

    // Determinar la categoria de la combinación
    let categoria;
    const valoresUnicos = Object.keys(conteo);
    const cantidadValoresUnicos = valoresUnicos.length;

    if (cantidadValoresUnicos === 5) {
        categoria = "TD";
    } else if (cantidadValoresUnicos === 4) {
        if (Object.values(conteo).includes(2)) {
            categoria = "1P";
        }
    } else if (cantidadValoresUnicos === 3) {
        if (Object.values(conteo).includes(3)) {
            categoria = "T";
        } else {
            categoria = "2P";
        }
    } else if (Object.values(conteo).includes(3) && Object.values(conteo).includes(2)) {
        categoria = "F";
    } else if (Object.values(conteo).includes(4)) {
        categoria = "P";
    } else {
        categoria = "Q";
    }

    return categoria;
}

/**
 * * calcula el test de poker
 * retorna un objeto con arrays columna para tabla base y solapada
 * @param {*} pseudoAleatorios 
 */
function obtenerPoker(pseudoAleatorios) {

    const probabilidadCategorias = [0.30240, 0.50400, 0.10800, 0.07200, 0.00900, 0.00045, 0.00010];
    let categorias = ["TD", "1P", "2P", "T", "F", "P", "Q"];

    // preparar array de digitos pseudoaleatorios para poder recorrer de a 5
    const redondeoCantidad = Math.floor(pseudoAleatorios.length/5);
    const recorridoMaximo = 5*redondeoCantidad;

    // frecuencia observada fo
    let fo = [0,0,0,0,0,0,0];
    for (let i = 0; i <= recorridoMaximo; i+=5) {
        let segmento = pseudoAleatorios.slice(i-5, i);
        switch (compararSegmento(segmento)) {
            case categorias[0]:
                fo[0]++;
                break;

            case categorias[1]:
                fo[1]++;
                break;
            
            case categorias[2]:
                fo[2]++;
                break;
            
            case categorias[3]:
                fo[3]++;
                break;

            case categorias[4]:
                fo[4]++;
                break;
            
            case categorias[5]:
                fo[5]++;
                break;
            
            case categorias[6]:
                fo[6]++;
                break;
            
            case categorias[7]:
                fo[7]++;
                break;
        
            default:
                break;
        }
    }

    // frecuencia esperada fe
    let fe = [];
    for (let i = 0; i < 7; i++) {
        fe.push(probabilidadCategorias[i]*recorridoMaximo);
    }

    // filas con frecuencias observadas en 0 deben descartarse,
    // junto a la categoria y frecuencia esperada.
    let fo_base = [];
    let fe_base = [];
    let categorias_base = [];
    for (let i = 0; i < 7; i++) {
        if (fo[i] !== 0) {
            fo_base.push(fo[i]);
            fe_base.push(fe[i]);
            categorias_base.push(categorias[i]);
        }
    }

    fo_base
    fe_base
    categorias_base

    // obtener (fe-fo)²/fe sobre los array, y sumatoria final
    const x2_base = [];
    for (let i = 0; i < fe_base.length; i++) {
        x2_base.push(Math.pow(fe_base[i]-fo_base[i], 2)/fe_base[i]);
    }

    const sumatoria_base = x2_base.reduce((suma, x2iesimo) => suma += x2iesimo, 0);
    let grados_libertad_base = categorias_base.length - 1;
    sumatoria_base
    grados_libertad_base

    // filas con frecuencias esperadas menores a 5 deben sumarse juntas
    // la categoria se elimina, las observadas se suman juntas
    // de quintilla para atras, solapar
    let fo_aux = 0, fe_aux = 0; //auxiliares de suma
    let fo_solapada = [...fo_base];
    let fe_solapada = [...fe_base];
    let categorias_solapada = [...categorias_base];
    for (let i = fe_base.length - 1; i >= 0; i--) {
        i
        if (fe_base[i] < 5) {
            fo_aux += fo_base[i];
            fe_aux += fe_base[i];
            fo_solapada.pop();
            fe_solapada.pop();
            categorias_solapada.pop();
        }
    }
    // sumo al final
    fo_solapada[fo_solapada.length - 1] += fo_aux;
    fe_solapada[fe_solapada.length - 1] += fe_aux;

    fo_aux
    fe_aux
    fo_solapada
    fe_solapada
    categorias_solapada

    // obtener (fe-fo)²/fe sobre los array solapados, y sumatoria final
    const x2_solapada = [];
    for (let i = 0; i < fe_solapada.length; i++) {
        x2_solapada.push(Math.pow(fe_solapada[i]-fo_solapada[i], 2)/fe_solapada[i]);
    }

    const sumatoria_solapada = x2_solapada.reduce((suma, x2iesimo) => suma += x2iesimo, 0);
    let grados_libertad_solapada = categorias_solapada.length - 1;
    sumatoria_solapada
    grados_libertad_solapada

    const resultado = {
        categorias_base: categorias_base,
        fo_base: fo_base,
        fe_base: fe_base,
        x2_base: x2_base,
        sumatoria_base: sumatoria_base,
        grados_libertad_base: grados_libertad_base,
        categorias_solapada: categorias_solapada,
        fo_solapada: fo_solapada,
        fe_solapada: fe_solapada,
        x2_solapada: x2_solapada,
        sumatoria_solapada: sumatoria_solapada,
        grados_libertad_solapada: grados_libertad_solapada
    }

    return resultado;
}

/**
 * * test de poker
 * retorna el test y mensaje de conclusion como un objeto
 */
function testPoker(pseudoAleatorios, p = '0.1') {

    // para las categorias, el grado de libertad (v) siempre es <= 7 
    // accedo al valor p usando objeto[p][v] (ver tabla chi-cuadrado aula virtual)
    const valoresTablaChiCuadrado = {
        '0.025': [0, 5.0239, 7.3778, 9.3484, 11.1433, 12.8325, 14.4494, 16.0128],
        '0.05' : [0, 3.8415, 5.9915, 7.8147, 9.4877, 11.0705, 12.5916, 14.0671],
        '0.1'  : [0, 2.7055, 4.6052, 6.2514, 7.7794, 9.2363, 10.6446, 12.0170]
    };

    // ejecutar test poker
    const resultado = obtenerPoker(pseudoAleatorios);

    // conclusion del test, usando valores de arrays solapados
    let conclusion = (resultado.sumatoria_solapada <= valoresTablaChiCuadrado[p][resultado.grados_libertad_solapada]) 
        ? ['PASA', '<='] 
        : ['NO PASA', '>='];

    let mensaje_conclusion = `La secuencia pseudoaleatoria ${conclusion[0]} el test siendo x² calculada: ${resultado.sumatoria_solapada} ${conclusion[1]} a x² de la tabla chi cuadrda: ${valoresTablaChiCuadrado[p][resultado.grados_libertad_solapada]}, con ${resultado.grados_libertad_solapada} grados de libertad y alfa ${p}`;

    //agrego mensaje de conclusion como propiedad
    resultado.mensaje_conclusion = mensaje_conclusion;
    resultado

    return resultado;
}