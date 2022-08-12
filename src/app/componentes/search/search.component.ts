import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //pa las rutas, Router para redireccionar, ActivatedRoute para sacar los params de tal ruta

import { Topic } from 'src/app/models/topic'; //el modelo de topic
import { TopicService } from 'src/app/servicio/topic.service'; //el servicio del topic

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TopicService],
})
export class SearchComponent implements OnInit {
 // las propiedades
  public page_title: string;
  public topics: Topic[];
  public no_paginate;
  

  constructor(
    // las tipo instancias|inyecciones
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService,
  ) {
    //darle valor a las propiedades
    this.page_title = "Buscar: ";
    this.topics = [];
    this.no_paginate = true;
    
    }

  //  metodo que se ejecuta al principio una ves
  ngOnInit(): void {
    
    // le pasamos dinamicamente el parametro de search que llega por la url (asi lo nombramos en la ruta = search)
    this._route.params.subscribe(params =>{
      var search = params['search']; // + = lo convertimos a numero

      this.page_title = this.page_title + ' ' + search;//

      this.getTopics(search); 
    });
  }




// metodo para conseguir los topics que halla del search
getTopics(search:any){
  this._topicService.search(search).subscribe(
    response =>{
      if(response.topics){//validar si llega la lista topics por la response
        this.topics = response.topics; //asignamos la response y nuestro objeto 
      }
    },
    error =>{
      console.log(error);
    },
  )
}

  
}
