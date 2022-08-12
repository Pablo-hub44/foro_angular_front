// documento de rutas propio especifico para el panel

// 1. importar los modulos del router, para trabajar con el router
import { Routes, RouterModule } from "@angular/router"; //espo va a permitir estableces una ruta dentro de  configuracion al routing para q funcione
import { NgModule } from "@angular/core"; //pk al final esto va a ser un modulo
import { UserGuard } from "../servicio/user.guard";///

// 2. importar componentes
import { MainComponent } from "./componentes/main/main.component"; 
import { AddComponent } from "./componentes/add/add.component"; 
import { EditComponent } from "./componentes/edit/edit.component";
import { ListComponent } from "./componentes/list/list.component"; 

// 3. Array de rutas
const panelRoutes: Routes = [//esto es un array de objetos json
    {//ruta panel y luego abra rutas hijas
        path : 'panel',
        component: MainComponent,
        canActivate:[UserGuard],///puede pasar cuando userguard sea true
        children: [ //rutas hijas
            {path: '', component: ListComponent},
            {path: 'listado', component: ListComponent},
            {path: 'crear', component: AddComponent},
            {path: 'editar/:id', component: EditComponent},
        ]
    }
];

// importar el modulo principal del module
@NgModule({
    imports:[
        RouterModule.forChild(panelRoutes)
    ],
    exports: [
        RouterModule
    ]
})

// 4. Exportar configuracion de todo esto como modulo
export class PanelRoutingModule{}

