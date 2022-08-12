// importar todo lo necesario
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //pa las rutas, Router para redireccionar, ActivatedRoute para sacar los params de tal ruta
import { User } from 'src/app/models/user';
import { Topic } from 'src/app/models/topic'; //el modelo de topic
import { TopicService } from 'src/app/servicio/topic.service'; //el servicio del topic
// comentarios por usuarios
import { UserService } from 'src/app/servicio/user.service';
// el servicio de comentarios
import { CommentService } from 'src/app/servicio/comment.service';
import { global } from 'src/app/servicio/global';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [UserService, TopicService],
})
export class UserDetailComponent implements OnInit {
  // las propiedades

  public user: User;
  public topics: Topic[];
  public url: string;

  constructor(
    // poner las dependencias|inyecciones
    private _userServive: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    // darle valor a las propiedades

    this.user = new User("","","","","","","");
    this.topics = [],
    this.url = global.url;

    }

    // se ejecutar al principio una ves, es como initstate
  ngOnInit(): void {
    // le pasamos dinamicamente el parametro del id que llega por la url 
    this._route.params.subscribe(params =>{
      var userId = params['id'];//el id q nos llega de la url (id asi se llama pk asi le pusimos en la ruta)se lo asiganmos a userid

      this.getUser(userId);
      this.getTopics(userId);
    });

  }

  // metodo pa conseguir un usuario
  getUser(userId:any){
    this._userServive.getUser(userId).subscribe(
      response => {
        if(response.user){ //validar si llega el objeto user en la response
          this.user = response.user;
        }else{ //sino 
          // redireccion
        }
      },
      error =>{
        console.log(error);
      },
    );
  }


  //metodo pa conseguir los topics por su usuario
  getTopics(userId:any){
    this._topicService.getMyTopicsByUser(userId).subscribe(
      response =>{
        if(response.topics){ //validar si hay topics en la respunse
          this.topics = response.topics; //y la response se la asignamos al array 
        }
      },
      error =>{
        console.log(error);
      },
    )
  }
}
