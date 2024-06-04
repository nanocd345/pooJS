import {Heroe} from "./heroe.js"

export class Combate {
    comenzarCombate(heroe, monstruo) {
        let mensajes = [];
        while (heroe.getVida > 0 && monstruo.getVida > 0) {
            this.atacar(heroe, monstruo);
            if (monstruo.getVida > 0) {
                this.atacar(monstruo, heroe);
            }
        }
        if (heroe.getVida <= 0) {
            mensajes.push([`${heroe.nombre} ha sido derrotado.`].join(" "));
        } else {
            mensajes.push([`${monstruo.nombre} ha sido derrotado.`].join(" "));
        }
        return mensajes;
    }

    atacar(atacante, objetivo) {
        const dano = atacante.getAtaque;
        objetivo.setVida=-dano;
        if (objetivo instanceof Heroe) { // Se verifica que el objetivo sea una instancia llamada Heroe
            objetivo.cansar();
        }
    }
}