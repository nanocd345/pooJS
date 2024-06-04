import {Criatura} from "./criatura.js"

export class Mostruo extends Criatura{
    constructor(){
        if (new.target === Mostruo) {
            throw new Error("Cannot instantiate an abstract class.");
        }
        super();
    }
}

export class Orco extends Mostruo{
    constructor(){
        super();
        this.setNombre = "Orco";
        this.setVida=30;
    }
}
export class Globin extends Mostruo{
    constructor(){
        super();
        this.setNombre = "Globin";
        this.setVida=10;
    }
}
export class Kobolt extends Mostruo{
    constructor(){
        super();
        this.setNombre = "Kobolt";
        this.setVida=20;
    }
}
