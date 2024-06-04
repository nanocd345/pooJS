export class Inventario {
    constructor() {
        this.items = [];
    }

    agregarItem(item) {
        this.items.push(item); //Guarda en la lista items el item dado
    }

    utilizarItem(item,objetivo){
        let mensajes;
        if (this.items.includes(item)) { //Se asegura si existe ese item en el inventario
            mensajes = item.utilizar(objetivo); //Se llama al metodo utilizar de items.js
            mensajes = mensajes + this.removerItem(item); //Se llama al metodo eliminarItem de este mismo archivo
            
        }else {
            mensajes="El item no esta en el inventario.";
        }
        return mensajes;
    }

    removerItem(item) {
        let mensajes = [];
        const index = this.items.indexOf(item); //Encuentra el index del item del inventario 
        if (index !== -1) { //Si no existe envia -1 por lo que no entra al iff
            this.items.splice(index, 1); //Toma el index del inventario y elimina la cantidad de items deseados
            mensajes.push([` ${item.nombre} ha sido eliminado del inventario.`].join(" "));
        }
        return mensajes;
    }

    imprimirLista() {
        let mensajes = [];
        mensajes.push("Inventario:"); 
        this.items.forEach(item => { //Se muestra cada item del inventario disponible
            mensajes.push([item.nombre,":",this.items.length].join(" "));
        });
        return mensajes;
    }

    encontrarItem(nombre) {
        return this.items.find(item => item.nombre === nombre); // Encuentra un item por su nombre en el array
    }
}