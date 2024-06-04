import { Area } from "./area.js";
import { Combate } from "./combate.js";
import { Heroe } from "./heroe.js";

export class Juego{
    constructor(){
        this.historial = []; // Se guarda el historial del juego
        this.heroe = new Heroe();
        this.combate = new Combate();
        this.juegoTerminado = false; // El juego aun no ha terminado
        this.areas = [new Area(), new Area(), new Area(),new Area(), new Area(), new Area(),new Area(), new Area(), new Area()]; 
        this.areaActual = null; // Empieza sin un area actual
    }
    
    loguear(mensaje){
        this.historial.push(mensaje);
        console.log(mensaje);
    }

    ejecutar(accion, objetivo){
        this.verificarJuego();
        if (this.juegoTerminado && accion !== 'reiniciar') {
            this.loguear("No puede realizar acciones estando muerto...");
            return;
        }
        switch (accion) {
            case 'atacar':
                this.atacar(objetivo);
                break;
            case 'moverse':
                this.moverse();
                break;
            case 'investigar':
                this.investigar();
                break;
            case 'descansar':
                this.descansar();
                break;
            case 'utilizarItem':
                this.utilizarItem(objetivo);
                break;
            case 'verInventario':
                this.verInventario();
                break;
            case 'reiniciar':
                this.reiniciar();
                break;
            default:
                this.loguear("Acción no reconocida.");
        }
    }

    verificarJuego(){
        if(this.heroe.getVida<=0){
            this.juegoTerminado=true;
            this.loguear("¡Has muerto!");
        }
    }

    investigar() {
        if (!this.areaActual) {
            this.loguear("No hay un área actual para investigar. ¡Muévete primero!");
            return;
        }
        const resultado = this.areaActual.investigar();
        this.loguear(resultado.mensaje);

        if (resultado.resultado === "Monstruo") {
            this.loguear("Derribalo antes de moverse a la siguiente área.");
            this.heroe.bloqueado = true; // Bloquea al heroe para que no se pueda mover
        } else if (resultado.resultado === "Item") {  // Agregar item al inventario si se encuentra uno
            this.heroe.inventario.agregarItem(resultado.objeto);
        }
    }

    verInventario() {
        const mensajes = this.heroe.inventario.imprimirLista();
        mensajes.forEach(mensaje => this.loguear(mensaje));
    }

    utilizarItem(items) {
        const item = this.heroe.inventario.encontrarItem(items);
        if (item) {
            const mensajes = this.heroe.inventario.utilizarItem(item, this.heroe);
            this.loguear(mensajes);
            this.loguear(["Vida de",this.heroe.nombre,":",this.heroe.getVida].join(" "));
        } else {
            this.loguear("El item no está en el inventario.");
        }
    }

    atacar() {
        if (!this.areaActual.mostruo) {
            this.loguear("No hay monstruo para atacar.");
            return;
        }
        const mensajes = this.combate.comenzarCombate(this.heroe, this.areaActual.mostruo);
        mensajes.forEach(mensaje => this.loguear(mensaje));
        this.heroe.bloqueado = false;
        this.loguear(["Vida de",this.heroe.nombre,":",this.heroe.getVida].join(" "));
    }

    moverse() {
        if (this.heroe.bloqueado) {
            this.loguear("No puedes moverte mientras hay un monstruo vivo en el área.");
            return;
        }
        const indiceAleatorio = Math.floor(Math.random() * this.areas.length); //Muy parecido al mostruo aleatorio solo que esto es para un area
        this.areaActual = this.areas[indiceAleatorio]; //Elige el area a moverse dependiendo del indice aleatorio encontrado
        this.loguear(`Te has movido a una nueva área.`);
    }

    descansar() {
        if (!this.areaActual) { //Busca si hay un area para descansar
            this.loguear("No hay un área actual para descansar.");
            return;
        }

        if (!this.areaActual.puedeDescansar()) { //Llama al metodo para ver si puede descansar en esa area
            this.loguear("No puedes descansar en esta área.");
            return;
        }
        const mensajes = this.heroe.descansar();
        mensajes.forEach(mensaje => this.loguear(mensaje));
        this.loguear(["Vida de",this.heroe.nombre,":",this.heroe.getVida].join(" "));
    }
    
    reiniciar(){
        this.heroe.setVidaBase = 160; // Se reinicia la vida del heroe
        this.heroe.descansado = true; // Se reinicia el estado cansado
        this.heroe.bloqueado = false; // Se desbloquea el movimiento del heroe
        this.juegoTerminado = false; // Se reinicia la variable
        // Se reinician las areas a investigar
        this.areas = [new Area(), new Area(), new Area(),new Area(), new Area(), new Area(),new Area(), new Area(), new Area()];
        this.heroe.reiniciarInventario(); // Se reinicia el inventario
        this.loguear("El juego ha sido reiniciado satisfactoriamente.");
        // Codigo para mejorar como se muestra el historial al reiniciar el heroe
        console.log("Historial antes del reinicio:")
        const data = {};
        this.historial.forEach((mensaje, index) => {
            data[`Mensaje ${index+1}`] = mensaje;
        });
        console.table(data);
        this.historial=[] // Se reinicia el historial del juego
    }
}
