// importar todo lo necesario
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //pa las rutas

import { Topic } from 'src/app/models/topic'; //el modelo de topic
import { UserService } from 'src/app/servicio/user.service'; //el servicio del usuario
import { TopicService } from 'src/app/servicio/topic.service'; //el servicio del topic

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html', //'./edit.component.html' antes, cambiado para reutilizar la vista ../add/add.component.html
  styleUrls: ['./edit.component.css'],
  providers: [UserService, TopicService],
})
export class EditComponent implements OnInit {
  // propiedades
  public page_title: string;
  public topic: Topic;
  public identity: any;
  public token: any;
  public status: string;
  public is_edit:boolean;

  constructor(//tipo instancias|inyeccion
  private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService,
  private _topicService: TopicService,
) { 
  //damos valor a las propiedades
  this.page_title = "Editar tema";
  this.status = "";
  this.identity = _userService.getIdentity();
  this.token = _userService.getToken();
  this.topic = new Topic('','','','','','',this.identity._id, null); //en user  ahi le ponemos el id del user , q esta en identity
  this.is_edit = true;
}

  ngOnInit(): void {
    this.getTopic();
  }

  onSubmit(form:any){
     // console.log(this.topic);//todo el form se rellena en nuestro objeto topic q se envia:D
    // actulizamos el topic
    var id = this.topic._id; //el id del topid se lo ponemos a id
    this._topicService.update(this.token, id, this.topic).subscribe(
      response =>{
        if (response.topicUpdated) {//validar, si llega en la response el topic, gracias al observable podemos ver la response
          this.is_edit = true;
          this.status = 'success';
          this.topic = response.topicUpdated; //el topic de la response se lo asignamos a nuestro objeto topic
          console.log("se edito")
        }else{
          this.status = 'error';
          console.log("no se edito")
          this.is_edit = false;
        }
      },
      error =>{
        this.status = 'error';
        console.log(error);
      }
    );
  }

  // metdo pa conseguir el topic
  getTopic(){
    this._route.params.subscribe((params: Params) =>{
      let id = params['id']; //el id del params se lo ponemos a nuestra propiedad id
      console.log(id);

      this._topicService.getTopic(id).subscribe(
        response =>{
          if (!response.topic) {//validar, si no hay topic en la response
            this._router.navigate(['/panel']);//lo lleve al panel
          }else{ //si todo bn, entonces le pasamos la responsse.topic a nuestro objeto topic
            this.topic = response.topic;
          }
        },
        error =>{
          console.log(error);
        },
      )
    });
  }



  
}
