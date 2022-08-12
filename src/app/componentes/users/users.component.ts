import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicio/user.service'; //importamos el servicio de usuarios
import { User } from 'src/app/models/user';
import { global } from 'src/app/servicio/global'; //para poder mostrar tambien, las img de los users

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  // ls propiedades
  public page_title: string;
  public users: User[]; //un array de users
  public url: string;

  constructor(
    // las tipo instancias|inyecciones
    private _userService: UserService,
  ) {
    //damos valor a las propiedades
    this.users = [];
    this.url = global.url;
    this.page_title = "Compañeros"
  }

  ngOnInit(): void {
    this.getUsers(); //invocamos al metodo
    }



  // metodo para conseguir los usuarios
  getUsers(){
    this._userService.getUsers().subscribe(
      response =>{
        if(response.users){ //validar si en la response esta el objeto users
          this.users = response.users; //asignamos los datos de la response a nuestro objeto users q es una lista de User (y dentro estaran todos los objetos de user)
        }
      },
      error =>{
        console.log(error);
      }
    )
  }
}
