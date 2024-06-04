import {Criatura} from "./criatura.js"
import { Inventario } from "./inventario.js";

export class Heroe extends Criatura{
    constructor(){
        super();
        this.setVida=60;
        this.setAtaque=10;
        this.descansado = true; // Comienza descansado
        this.inventario = new Inventario();
    }
    descansar() {
        let mensajes = [];
        if (!this.descansado) {
            this.setVida = 20; // Aumenta la vida al descansar
            this.descansado = true; // Esta descansado
            mensajes.push("El héroe ha descansado y ha recuperado 20 puntos de vida.");
        } else {
            mensajes.push("El heroe ya esta descansado, no puede descansar nuevamente.");
        }
        return mensajes;
    }
    cansar() {
        this.descansado = false; // El heroe se cansa cuando es atacado
    }
    reiniciarInventario(){
        this.inventario = new Inventario();
    }
}