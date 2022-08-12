// como en el app.modules
// 1. cargar modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //permitir usar formularios dentro del modulo
// poner nuestras rutas echas para q angular lo pille
import { routing, appRoutingProviders } from './../app.routing';
// import {CommonModule} 
import { HttpClientModule } from '@angular/common/http'; //para poder usar el httpcliente en los servicios, se pone aca su modulo principal
import { PanelRoutingModule } from './panel.routing'; //importas toda la rutas de panel routing
import { MomentModule } from 'angular2-moment';//para las fechas


// 2. cargar componentes
import { MainComponent } from "./componentes/main/main.component";
import { AddComponent } from "./componentes/add/add.component";
import { EditComponent } from "./componentes/edit/edit.component";
import { ListComponent } from "./componentes/list/list.component";
// import { mainModule } from 'process';

// 3. los servicios
import { UserService } from '../servicio/user.service';
import { UserGuard } from '../servicio/user.guard'; //ambos ya que en userguard ocupamos userService, pa validar que si alla y no pueda escribir rutas en url

// 4. ngmodule
@NgModule({
    declarations: [//aca se cargan los componentes, lo q sea q valla a representar algo en la vista
        MainComponent,
        AddComponent,
        EditComponent,
        ListComponent
    ],
    imports: [//aca los modulos
        BrowserModule,
        FormsModule,
        HttpClientModule,
        PanelRoutingModule,
        routing,
        MomentModule
    ],
    // bootstrap: [AppComponent],
    exports: [ //exportarlos pa poder usarlos en el modulo 'principal'
    MainComponent,
    AddComponent,
    EditComponent,
    ListComponent
    ],
    providers: [//aca los servicios
    appRoutingProviders,
    UserService,
    UserGuard,
    ],
})
    export class  PanelModule{}