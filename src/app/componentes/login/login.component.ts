import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';//importar el modelos de user
import { UserService } from './../../servicio/user.service'; //el servicio
import { Router, ActivatedRoute, Params } from '@angular/router'; // para las rutas, para poder redirigir

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  //propiedades
  public page_title: string;
  public user : User;
  public status: string;
  public identity:any;//aqui vamos a guardar la response del usuario, osea todos sus datos
  public token:any;

  constructor(
    //tipo instanciar/inyectar las dependencias
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    // definir el valor de la propiedades
    this.page_title = "Identificate";
    this.user = new User('','','','','','','ROLE_USER');
    this.status= "";
    }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    // console.log(this.user);
    //1.  conseguir el objeto completo del usuario logueado
    this._userService.signin(this.user).subscribe(//metodo subscribe q se puede usar gracias al observable
      response => {
        if (response.user && response.user._id) {// validar si tenemos de la response el user y el user._id
          this.status = 'success';
          // console.log(response);

          // Guardamos el usuario en una propiedad
          this.identity = response.user; //todo el user se lo ponemos a identity
          //los guardamos en el local storage la memoria local del navegador y asi va a persistir el usuario y su token, el local storage solo acepta strings y enteros
          localStorage.setItem('identity', JSON.stringify(this.identity));//asi convertimos el json a string(osease todo en "")


          //2. conseguir el token del usuario identificado
          // lo mismo pero ahora con el true para que nos saque el token
          this._userService.signin(this.user, true).subscribe(//metodo subscribe q se puede usar gracias al observable
            response => {
              if (response.token) {//comprobar si me llega el token, pasa exito

                //3. guardar el token del usuario en una propiedad
                this.token = response.token; //guardamos el token en una propiedad
                console.log(this.token);
                localStorage.setItem('token', this.token);//asi convertimos el json a string | lo mismo hacemos con el token guardarlo en localstorage

                this.status= 'success';
                this._router.navigate(['/home']); //al final que lo rediriga a home
              }else{
                this.status = 'error';
              }
            },
            error =>{
              this.status = 'error';
              // console.log(error);
            },
          )
        }else{
          this.status = 'error';
        }
        // form.reset(); //para que alginal limpie el formulario no muy necesario
      },
      error =>{
        this.status = 'error';
        console.log(error);
      },
    )
  }
}
