import { Component, OnInit, DoCheck } from '@angular/core'; //oninit es una interfaz, es como el initstate
//docheck q permite cada cierto tiempo hacer cierta logica o actualizar ciertas variables
// portamos nuestro servicion de userService de manera global
import { UserService } from './servicio/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router'; // para las rutas, para poder redirigir
import { global } from './servicio/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
})
export class AppComponent implements OnInit, DoCheck{
  //nuestras propiedades, (q las podemos usar el la vista :D)
  public title = 'foro-angular';
  public identity:any;
  public token: any;
  public url:any;
  public search:any;

  constructor(
    // tipo instanciamos|inyectamos
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
  ){
    this.identity = this._userService.getIdentity(); //asi sacamos el getidentity de userservice, guardado en el localStorage y se lo asignamos a esta propiedad identity
    this.token = this._userService.getToken();
    this.url = global.url;
  }
  //el metodo del docheck
  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
  }

  // evento q detecta cuando un componente esta caragdo, implementado q se ejecutara el principio
  ngOnInit(): void {
    console.log(this.identity);
    console.log(this.token);
  }

  logout():void{
    localStorage.clear(); //para limpiar todo lo que halla en el local storage
    this.identity = null;
    this.token = null;
    this._router.navigate(['/home']); //y que lo rediriga a home
  }

  goSearch(){
    // alert(this.search);
    // this._router.navigate(['/buscar/', this.search]); //le redirigimos a la ruta buscar y tambien con la propiedad search
    // mejora
    //redireccion para cuando estamos sobre la ruta de SearchComponent y renderizar la pagina de nuevo con el nuevo page_tittle
    this._router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>
    this._router.navigate(['/buscar/' + this.search])); 
    // de esta manera primero se dirige a inicio borrando el objeto SeachComponent 
    // y luego vuelve a SearchComponent con el page title limpio, se crea un nuevo objeto. 
  }
}


// un huck es un docheck, lo que hace es que cuando se produce un cambio a nivel de componentes en la aplicacion se va a ejecutar
// entonces cuando me identifique se ejecutara ese dud check