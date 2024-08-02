// importar todo lo necesario
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //pa las rutas

import { Topic } from 'src/app/models/topic'; //el modelo de topic
import { UserService } from 'src/app/servicio/user.service'; //el servicio del usuario
import { TopicService } from 'src/app/servicio/topic.service'; //el servicio del topic

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, TopicService],
})
export class AddComponent implements OnInit {
  // propiedades
  public page_title: string;
  public topic: Topic; //objeto
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
    //damos valor a las propiedades
    this.page_title = "Crear nuevo tema";
    this.status = "";
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.topic = new Topic('','','','','','',this.identity._id, null); //en user  ahi le ponemos el id del user , q esta en identity
  }

  //metodo q se ejecuta el inicio
  ngOnInit(): void {
    console.log(this._topicService.prueba());
  }

  // metodo pa enviar el formulario
  onSubmit(form:any){
    // console.log(this.topic);//todo el form se rellena en nuestro objeto topic q se envia:D
    this._topicService.addTopic(this.token, this.topic).subscribe(
      response =>{
        if(response.topic){//validamos si si hay un topic en la response
          this.status = 'success';
          this.topic = response.topic; //le asignamos la respuesta a la propiedad de aca topic
          this._router.navigate(['/panel']); // y redirigimos a panel
        }else{
          this.status = "error";
        }
      },
      error =>{//si hay un error, error
        this.status = 'error';
        console.log(error);
      },
    )
  }
}





//         public _id: string,
//         public title: string,
//         public content: string,
//         public code: string,
//         public language: string,
//         public date: string,
//         public user: any,// user donde esta el id del user que creo ese tema, any pa que sea lo que sea jeje
//         public comments: any