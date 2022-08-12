
export class User{ //export quiere decir es que luego podemos importarlo luego en cualquier otro fichero
    constructor(
        // definimos sus propiedades
        public _id: string,  
        public name: string,  
        public surname: string,  
        public email: string,  
        public password: string,  
        public image: string,  
        public role: string,  
    ){}
}

// porque se definen las propiedades dentro del constructor?
// pk nos ahorramos 3 pasos, nos ahorramos definir la propiedad en la clase. pasarsela como parametro al constructor y asiganle
// un  valor dentro( este como que no), haciendo por ejemplo public
// 
// public name: string,
// public surname: string,
// public email: string,
// public password: string,
// public image:string,
// public role: string,