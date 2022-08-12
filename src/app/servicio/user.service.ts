import { Injectable } from '@angular/core'; //esto va a permitir inyectar este servicio dentro de una propiedad en cualquier componente
import { HttpClient, HttpHeaders } from '@angular/common/http';// el httpcliente permite basicamente realizar las peticiones ajax al backend hacer el post,put,get,delete, etc
import { Observable } from 'rxjs'; // para poder usarlo
import { User } from '../models/user'; //importar el modelo
import { global } from './global'; //pa usar nuestra ruta por defecto
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // nuestras propiedades
  public url: string;
  public identity:any;
  public token:any;

  constructor(
    //aca tipo instanciamos
    private _http: HttpClient,
  ) { 
    //definimos el valor a las propiedades
    this.url = global.url;
  }

  //metodo
  prueba(){
    return "hola mundo desde el servicio de angular";
  }

  //metodo register, q va a recibir de parametro el objeto usuario q va a ser lo que va a guardar
  register(user:any): Observable<any>{
    // 1. convertir el objeto del usuario a un json string
    let parametros = JSON.stringify(user);// stringify permite convertir cualquier objeto en este caso nuestro objeto user, a un json string

    // 2.Definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', "application/json");

    // 3.Hacer la peticion Ajax
    return this._http.post(this.url + 'register', parametros, {headers: headers});//el metodo register del backend
    //                                         , los datos q estan dentro de parametros, las cabeceras
  }

  //metodo para loguearse
  signin(user:any, getToken:any = null): Observable<any>{//getToken = null para sacar el token o el usuario decodificado
    // 1. comprobar si llega el gettoken
    if(getToken != null){ //si gettoken no es nulo
      user.getToken = getToken; //el token se lo asignamos al gettoken
    }
    // 1.5 convertir el objeto del usuario a un json string
    let parametros = JSON.stringify(user);

    // 2. definir cabeceras
    let headers = new HttpHeaders().set('Content-Type', "application/json");

    // 3. hacer peticion ajax
    return this._http.post(this.url + 'login', parametros, {headers: headers}); //el metodo login del bakend
  }


  //metodo pa que nos saque los datos del local storage del usuario
  getIdentity(){
    //como lo subimos como string, ahora lo volvemo a poner tipo json, objeto de javascript usable
    let identity = JSON.parse(localStorage.getItem('identity') || '{}');

    if(identity && identity != null && identity != undefined && identity != "undefined"){ //identity solito , esque de true
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity; //retornamos nuestra propieda identity ya llena del local storage
  }

  //metodo pa que nos saque el token
  getToken(){
    let token = localStorage.getItem('token') ;

    if(token && token != null && token != undefined && token && token != "undefined"){ //identity solido , esque de true
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token; //retornamos nuestra propieda identity ya llena del local storage
  }

// metodo pa actualizar el usuario
  update(user:any): Observable<any>{ //de parametro el user que vamos a actualizar, observable para poder usar params,etc
    // crear variable para los parametros q vamos a enviar
    let parametros = JSON.stringify(user); //pa que convierta el objeto de javascript a un json string que podamos enviar

    // las cabeceras,  pasandole el content-type y el autorization
    let headers = new HttpHeaders().set('Content-type', 'application/json')
                                  .set('Authorization', this.getToken());//y tambien le pasamos le token del usuario

    // retornar una peticion ajax al servidor, put para actualizar
    return this._http.put(this.url + 'user/update', parametros, {headers: headers});
//                  ( peticion ajax a esta url + ruta, el param json convertido a un jsonString, las cabeceras en este formato)
  }


  // metodo q nos devuelve todos los usuarios
  getUsers() :Observable<any>{
     // retornar una peticion ajax al servidor, get para obtener
    return this._http.get(this.url+'users');
  }

    // metodo q nos devuelve un usuario, para ver el detalle de un usuario
    getUser(userId:any) :Observable<any>{
      // retornar una peticion ajax al servidor, get para obtener
    return this._http.get(this.url+'user/'+userId);
  }
}
