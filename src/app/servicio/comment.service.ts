import { Injectable } from '@angular/core'; //pa que pueda ser inyectado en en otros laos
import { HttpClient, HttpHeaders } from '@angular/common/http'; //pa hacer la peticion ajax
import { Observable } from 'rxjs'; //pa poder ocupar el observable en las funciones
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
// las propiedades
public url: string;

constructor(
  // los tipo instancias|inyecciones
  private _http :HttpClient, //pa poder hacer peticiones ajax

) {
  // darle un valor a las propiedades
  this.url = global.url;
  }


  // metodo de agregar un commentario | se agrega a un topic
  add(token:any, comment:any, topicId:any): Observable<any>{//le pasamos el token y el objeto del topic
    // a una api no le podemos pasar un objeto de javascript puro, tenemos que hacer q ese objeto sea un json string
    //1 crear variable para los parametros q vamos a enviar
    let parametros = JSON.stringify(comment); //pa que convierta el objeto de javascript a un json string que podamos enviar

    //2 las cabeceras,  pasandole el content-type y el autorization
    let headers = new HttpHeaders().set('Content-type', 'application/json')
                                  .set('Authorization', token);//y tambien le pasamos le token del usuario

    //3 retornar una peticion ajax al servidor, put para actualizar
    return this._http.post(this.url + 'comment/topic/'+topicId, parametros, {headers: headers});
//                  ( peticion ajax a esta url + ruta+ el id del topic, el param json convertido a un jsonString, las cabeceras en este formato)
  }



  
//   // metodo para actualizar un topic
//   update(token:any, id:any, topic:any): Observable<any>{ //le pasamos el token pa saber que el user esta identificado, el id del topic a actualizar y el objeto del topic
//     //1 crear variable para los parametros q vamos a enviar
//     let parametros = JSON.stringify(topic); //pa que convierta el objeto de javascript a un json string que podamos enviar

//     //2 las cabeceras,  pasandole el content-type y el autorization
//     let headers = new HttpHeaders().set('Content-type', 'application/json')
//                                   .set('Authorization', token);//y tambien le pasamos le token del usuario

//     //3 retornar una peticion ajax al servidor, put para actualizar
//     return this._http.put(this.url + 'topic/'+id, parametros, {headers: headers});
// //                  ( peticion ajax a esta url + ruta y le pasamos el id, el param json convertido a un jsonString, las cabeceras en este formato)
//               //              el id del topic a actualizar
//   }



// metodo de borrar un commentario
delete(token:any, topicId:any, commentId:any): Observable<any>{

  //1 las cabeceras,  pasandole el content-type y el autorization
  let headers = new HttpHeaders().set('Content-type', 'application/json')
                                  .set('Authorization', token);//y tambien le pasamos le token del usuario

  //2 retornar una peticion ajax al servidor, put para actualizar
  return this._http.delete(this.url + 'comment/'+topicId + '/' + commentId, {headers: headers});
  //                  ( peticion ajax a esta url + ruta y le pasamos los id del topic y del comment, las cabeceras en este formato)
  //              el id del topic a borrar
}



}
