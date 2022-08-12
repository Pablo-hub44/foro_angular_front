

export class Topic{
    constructor(
        //propiedades
        public _id: string,
        public title: string,
        public content: string,
        public code: string,
        public language: string,
        public date: string,
        public user: any,// user donde esta el id del user que creo ese tema, any pa que sea lo que sea jeje
        public comments: any,
        
    ){}
}



// del backend
// title: String,
//     content: String,
//     code: String, //codigo
//     language: String,
//     date: { type: Date, default: Date.now },
//     user: { type: Schema.ObjectId, ref: 'User' }, //una 'relacion' entre comillas entre entidades, objectid relacionandose con el User su id
//     comments: [CommentSchema] //un submodelo :D enbebido