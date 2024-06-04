export class Pocion {
    constructor(nombre) {
        this.nombre = nombre;
    }
    utilizar(objetivo) {
        let mensajes = [];
        objetivo.setVida =  80; // Aumenta la vida del héroe en 80 puntos
        mensajes.push([`${objetivo.nombre} ha utilizado una ${this.nombre} y ha recuperado 80 puntos de vida.`].join(" "));
        return mensajes;
    }
}