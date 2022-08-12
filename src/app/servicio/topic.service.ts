import { Injectable } from '@angular/core'; //pa que pueda ser inyectado en en otros laos
import { HttpClient, HttpHeaders } from '@angular/common/http'; //pa hacer la peticion ajax
import { Observable } from 'rxjs'; //pa poder ocupar el observable en las funciones
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  // las propiedades
  public url: string;

  constructor(
    // los tipo instancias|inyecciones
    private _http :HttpClient, //pa poder hacer peticiones ajax

  ) {
    // darle un valor a las propiedades
    this.url = global.url;
    }


    //metodo de prueba
    prueba(){
      return "hola mundo desde el topic service";
    }


    // metodo de agregar un topic
    addTopic(token:any, topic:any): Observable<any>{//le pasamos el token y el objeto del topic
      // a una api no le podemos pasar un objeto de javascript puro, tenemos que hacer q ese objeto sea un json string
      //1 crear variable para los parametros q vamos a enviar
      let parametros = JSON.stringify(topic); //pa que convierta el objeto de javascript a un json string que podamos enviar

      //2 las cabeceras,  pasandole el content-type y el autorization
      let headers = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', token);//y tambien le pasamos le token del usuario

      //3 retornar una peticion ajax al servidor, post para guardar
      return this._http.post(this.url + 'topic', parametros, {headers: headers});
  //                  ( peticion ajax a esta url + ruta, el param json convertido a un jsonString, las cabeceras en este formato)
    }



    // metodo para conseguir todos los topics por usuario
    getMyTopicsByUser(userId:any): Observable<any>{ //le pasamos el token porque de ahi va a sacar el user identificado y nos muestre sus topics de ese user
      //1 las cabeceras,  pasandole el content-type 
      let headers = new HttpHeaders().set('Content-type', 'application/json');

      //2 retornar una peticion ajax al servidor, put para actualizar
      return this._http.get(this.url + 'user-topics/'+userId, {headers: headers});
  //                  ( peticion ajax a esta url + ruta y le pasmao el userid,  las cabeceras en este formato)
    }


    // metodo pa consguir un solo topic, le pasamos el id del topic q queremos sacar
    getTopic(id:any): Observable<any>{
      // retorna la peticion ajax
      return this._http.get(this.url+'topic/'+id); //y le pasamos el id del tipic por la ruta :D
    }



    // metodo para actualizar un topic
    update(token:any, id:any, topic:any): Observable<any>{ //le pasamos el token pa saber que el user esta identificado, el id del topic a actualizar y el objeto del topic
      //1 crear variable para los parametros q vamos a enviar
      let parametros = JSON.stringify(topic); //pa que convierta el objeto de javascript a un json string que podamos enviar

      //2 las cabeceras,  pasandole el content-type y el autorization
      let headers = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', token);//y tambien le pasamos le token del usuario

      //3 retornar una peticion ajax al servidor, put para actualizar
      return this._http.put(this.url + 'topic/'+id, parametros, {headers: headers});
  //                  ( peticion ajax a esta url + ruta y le pasamos el id, el param json convertido a un jsonString, las cabeceras en este formato)
                //              el id del topic a actualizar
    }



  // metodo de borrar un topic
  delete(token:any, id:any): Observable<any>{

    //1 las cabeceras,  pasandole el content-type y el autorization
    let headers = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', token);//y tambien le pasamos le token del usuario

    //2 retornar una peticion ajax al servidor, put para actualizar
    return this._http.delete(this.url + 'topic/'+id, {headers: headers});
    //                  ( peticion ajax a esta url + ruta y le pasamos el id, las cabeceras en este formato)
    //              el id del topic a borrar
  }

  // metodo para conseguir todos los topics
  getTopics(page = 1): Observable<any>{//por deffecto la page ira a 1, en caso de q no nos llegue
    // simplemente hacer el return de la peticion ajax, ya q no tenemos|necesitamos ni parametros ni cabeceras
    return this._http.get(this.url + 'topics/'+page);
    //                  ( peticion ajax a esta url + la pagina que queremos sacar )
  }


  // el metodo se busqueda de un topic
  search(searchString:any): Observable<any>{
    // simplemente hacer el return de la peticion ajax, ya q no tenemos|necesitamos ni parametros ni cabeceras
    return this._http.get(this.url + 'search/'+searchString);
  }
}
