import { Orco, Globin, Kobolt } from "./mostruo.js";
import { Pocion } from "./pocion_vida.js";

export class Area {
    constructor() {
        this.investigada = false;  // No esta investigada
        this.mostruo = null; // No hay mostruos
    }

    investigar() {
        
        if (this.investigada) { // Informa si ya esta investigada
            return { 
                resultado: "Nada", 
                mensaje: "Esta área ya ha sido investigada." 
            };
        }
        this.investigada = true; // Marca el area como investigada
        const probabilidad = Math.random(); // Genera un numero aleatorio entre 0 y 1

        if (probabilidad <= 0.5 && probabilidad>=0) {  // 50% de probabilidad de encontrar un monstruo
            const mostruo = [Orco, Globin, Kobolt];//Guardamos las 3 clases de mostruos
            //Multiplicamos un numero aleatorio entre 0 y 1 tomando el 0 pero no el 1 por la longitud de la lista de mostruos y finalizamos
            // redondeando hacia abajo el entero mas cercano de nuestro resultado
            const indiceAleatorio = Math.floor(Math.random() * mostruo.length);
            const mostruoAleatorio = new mostruo[indiceAleatorio](); //Escogemos la posicion del valor aleatorio en nuestra lista
            this.mostruo = mostruoAleatorio; // Se modifica la variable mostruo para saber si hay un mostruo o no en esta area
            //Guarda el objeto mostruoAleatorio
            return { 
                resultado: "Monstruo",
                objeto: mostruoAleatorio, 
                mensaje: `¡Un ${mostruoAleatorio.constructor.name} ha aparecido!`
            };
        } else if (probabilidad <= 0.7 && probabilidad >0.5) { // 20% de probabilidad de encontrar un ítem
            const pocion = new Pocion("Pocion de Vida");
            //Guarda el objeto pocion
            return { 
                resultado: "Item", 
                objeto: pocion, 
                mensaje: `¡Has encontrado una ${pocion.nombre}!` 
            };
        } else{ // 30% de probabilidad de no encontrar nada
            return { 
                resultado: "Nada", 
                mensaje: "No has encontrado nada." 
            };
        }
    }

    puedeDescansar() {  //Permite investigar solo si investigada = true y no hay mostruos
        return this.investigada && this.mostruo===null;
    }
}
