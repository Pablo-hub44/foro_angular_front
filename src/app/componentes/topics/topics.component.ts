// importar todo lo necesario
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //pa las rutas, Router para redireccionar, ActivatedRoute para sacar los params de tal ruta

import { Topic } from 'src/app/models/topic'; //el modelo de topic
import { TopicService } from 'src/app/servicio/topic.service'; //el servicio del topic

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [TopicService]
})
export class TopicsComponent implements OnInit {
  // las propiedades
  public page_title: string;
  public topics: Topic[];
  public totalPages:any;
  public page:any;
  public next_page:any;
  public prev_page:any;
  public number_pages:number[];
  public load: boolean;

  constructor(
    // las tipo instancias|inyecciones
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService,
  ) {
    //darle valor a las propiedades
    this.page_title = "Temas";
    this.topics = [];
    this.number_pages = [];
    this.load =false;
    }

  ngOnInit(): void {

    // le pasamos dinamicamente el parametro de la pagina que llega por la url 
    this._route.params.subscribe(params =>{
      var page = +params['page']; //lo convertimos a string

      if(!page || page == null  || page == undefined){//validamos que la pagina no de nada de esto
        page=1;
        this.prev_page = 1;
        this.next_page = 2;
      }

      this.getTopics(page); //ahora le pasamos el conseguido del parametro
    });
  }

  // metodo pa obtener los topicsss
  getTopics(page = 1){
    this._topicService.getTopics(page).subscribe(
      response =>{
        if(response.topics){ //validar, si hay topics en la response, exito
          this.topics = response.topics;
          console.log(this.topics);

          // navegacion de paginacion
          this.totalPages = response.totalPages;
          console.log(this.totalPages); //cmo sabe??

          // crear los numeracion de la pagina de navegacion  | navegacion de paginacion
          var number_pages = []; //arreglo q sera relleno, del num de pages
          for (let i = 1; i <= this.totalPages; i++) {
            number_pages.push(i);//push agrega un elemeto al final de larray
            
          }
          this.number_pages = number_pages;
          this.load = true;

          if(page >= 2){ //validar la prevpage
            this.prev_page = page -1; //le restamos 1 a la pag actual
          }else{// sino que sea 1 , pa q no podamos ir a la pag -1 , etc
            this.prev_page =1;
          }

          if(page < this.totalPages){ //validar la nextpage  ejem 2<3
            this.next_page = page +1;
          }else{
            this.next_page = this.totalPages;
          }



        }else{ //sino, error
          this._router.navigate(['/home']); //que lo rediriga a home
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

}
