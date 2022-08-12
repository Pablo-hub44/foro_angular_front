
export class Comment{
    constructor(
        public _id: string,
        public content: string,
        public date: string,
        public user: any,
    ){}
}



//  content: String,
//  date: { type: Date, default: Date.now },
//  user: { type: Schema.ObjectId, ref: 'User' }, //referencia a User