export class Criatura{
    #vida=100;
    #vidaMaxima=200;
    #ataque=10;
    constructor(){
        // Estructura basica para establecer una clase abstracta
        if (new.target === Criatura) { 
            throw new Error("Cannot instantiate an abstract class.");
        }
        this.setNombre=undefined;
    }
    set setNombre(nom="Jhon"){
        this.nombre = nom;
    }
    set setVida(puntos){
        this.#vida += puntos;
        if (this.#vida > this.#vidaMaxima) { // Si la vida excede la vida maxima, se establecera en la vida maxima
            this.#vida = this.#vidaMaxima; 
            console.log("El heroe no puede tener mas de 200 puntos de vida.")
        } 
    }
    set setVidaBase(puntos){
        this.#vida=puntos;
    }
    set setAtaque(puntos){
        this.#ataque += puntos;
    }
    get getAtaque(){
        return this.#ataque;
    }
    get getVida(){
        return this.#vida;
    }
    get getVidamaxima(){
        return this.#vidaMaxima;
    }
}