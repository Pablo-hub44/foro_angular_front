import { UserService } from './../../servicio/user.service'; //el servicio
import { Component, OnInit } from '@angular/core';

// importar modelo de usuario
import { User } from './../../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService], //aqui en providers ponemos el del UserService
})
export class RegisterComponent implements OnInit {
  //propiedades
  public page_title: string; //donde vamos a poner nuestro titulo
  public user: User;// el objeto que bamos a rrellenar y vamos a enviar a la api
  public status: string;

  constructor(
    //aqui lo tipo instanciamos los imports q pusimos
    private _userService: UserService,
  ) { 
    //en el cuerpo definimos los valores de las propiedades
    this.page_title = "Registrate";
    this.user = new User('','','','','','','ROLE_USER');
    this.status = "";

        // public _id: string,  
        // public name: string,  
        // public surname: string,  
        // public email: string,  
        // public password: string,  
        // public image: string,  
        // public role: string,  
  }

  //metodo que se ejecuta al inicio
  ngOnInit(): void {
    console.log( this._userService.prueba());
  }

  // metodo de enviar el formulario
  onSubmit(form:any) {//le va a llegar como parametro el formulario,  subscribe es un callback
    this._userService.register(this.user).subscribe(//dentro le pasamos el objeto(rellenado gracias el form) que se guardara en la bd
      response =>{//la respuesta
        console.log(response);
        if(response.user){//validar si hay una respuesta y hay un user id entra, | podemos user response gracias a Observable
          this.status = "success";
          form.reset(); //para que nos liempie el formulario una ves q se envie la info
        }else{
          this.status = "error";
        }
      },
      error =>{ //si hay un error, error
        console.log(error);
      },
    ); 
  }


  
}
