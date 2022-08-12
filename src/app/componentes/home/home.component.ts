import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // nuestras propiedades
  public page_title: string;

  constructor() {
    //aca dentro del cuerpo del constructor le ponemos un valor a las propiedades
    this.page_title = 'Bienvenido al foro de programacion';
    }

  ngOnInit(): void {
  }

}
