// importar todo lo necesario
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //pa las rutas

import { Topic } from 'src/app/models/topic'; //el modelo de topic
import { UserService } from 'src/app/servicio/user.service'; //el servicio del usuario
import { TopicService } from 'src/app/servicio/topic.service'; //el servicio del topic


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService, TopicService],
})
export class ListComponent implements OnInit {
// propiedades
public page_title: string;
public topics: Array<Topic>; //va a ser un array de topic
public identity: any;
public token: any;
public status: string;

constructor(
  //tipo instancias|inyeccion
  private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService,
  private _topicService: TopicService,
) { 
  //damos valor a las propiedades dentro del cuerpo del contructor
  this.page_title = "Mis temas";
  this.status = "";
  this.identity = _userService.getIdentity();
  this.token = _userService.getToken();
  this.topics = [];
}


// metodo q se inicia al principio
  ngOnInit(): void {
    this.getTopics();
  }

  //metodo pa conseguir los topics por su usuario
  getTopics(){
    var userId = this.identity._id; //conseguimos el userid del identity
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


  // metodo de borrar un tema
  deleteTopic(id:any){
    this._topicService.delete(this.token, id).subscribe(
      response => {
        this.getTopics(); //si todo bien que devuelva los topics
      },
      error =>{
        console.log(error);
      }
    )
  }

}
