// importar todo lo necesario
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //pa las rutas, Router para redireccionar, ActivatedRoute para sacar los params de tal ruta

import { Topic } from 'src/app/models/topic'; //el modelo de topic
import { TopicService } from 'src/app/servicio/topic.service'; //el servicio del topic
// importar lo necesario para lo de los comentarios
import { Comment } from 'src/app/models/comment'; 
// comentarios por usuarios
import { UserService } from 'src/app/servicio/user.service';
// el servicio de comentarios
import { CommentService } from 'src/app/servicio/comment.service';
import { global } from 'src/app/servicio/global';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [TopicService, UserService, CommentService],
})
export class TopicDetailComponent implements OnInit {
// las propiedades
public topic: Topic;
public comment: Comment;
public identity: any;
public token:any;
public status: string;
public url:any;


constructor(
  // las tipo instancias|inyecciones
  private _route: ActivatedRoute,
  private _router: Router,
  private _topicService: TopicService,
  private _userService: UserService,
  private _commentService: CommentService
) {
  //darle valor a las propiedades
  this.topic = new Topic('','','','','','','', ''); //en user  ahi le ponemos el id del user , q esta en identity
  this.status= "";
  this.identity = _userService.getIdentity();
  this.token = _userService.getToken();

  this.comment = new Comment('','','',this.identity._id); //le ponemos el id del user al comment
  this.url = global.url;

  }
  ngOnInit(): void {
    this.getTopic(); //llamamos al metod para que se ejecute
  // if(this.identity != null){ //validamos si es que identity es nulo
  //   this.comment = new Comment('','','',this.identity._id); //le ponemos el id del user al comment
  // }
  }

  onSubmit(form:any){
    // console.log(this.comment);
    this._commentService.add(this.token, this.comment, this.topic._id).subscribe(
      response =>{ //la response devuelve un objeto y gracias a ello podemos asignarlo al objeto topic de aca
        if(!response.topic){ //validar si no llega topic en la response
          this.status = 'error';
        }else{ //si si, success
          this.status =  'success';
          this.topic = response.topic; //asignamos el topic de la response a nuestro objeto topic y ahi dentro va el comment
          form.reset(); //limpiamos el form
        }
      },
      error =>{
        this.status = 'error';
        console.log(error);
      },
    )
  }

  // metodo de conseguir el topic
  getTopic(){
    // recojer los parametros que nos llegan por la url
    this._route.params.subscribe(
      params =>{
        let id = params['id']; //el id q nos llega de la url se lo asiganmos a id

        this._topicService.getTopic(id).subscribe(
          response => {
            if (response.topic) { //validamos y hay topic en la response
              this.topic = response.topic; //la response se la ponemos a topic
            }else{//si no hay
              this._router.navigate(['/home']); //que lo redireccione a home
            }
          },
          error =>{
            console.log(error);
          },
        )
      },
      
    )
  }

  deleteComment(id:any){
    // console.log(this.comment);
    this._commentService.add(this.token, this.topic._id, id).subscribe(
      response =>{
        if(!response.topic){ //validar si no llega topic en la response
          this.status = 'error';
        }else{ //si si, success
          this.status =  'success';
          this.topic = response.topic; //asignamos el topic de la response a nuestro objeto topic
        }
      },
      error =>{
        this.status = 'error';
        console.log(error);
      },
    )
  }
}

// public _id: string,
// public content: string,
// public date: string,
// public user: any,