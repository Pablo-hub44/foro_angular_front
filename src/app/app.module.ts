import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// poner nuestras rutas echas para q angular lo pille
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms'; //para poder usar ngForm y ngModel
import { HttpClientModule } from '@angular/common/http'; //para poder usar el httpcliente en los servicios, se pone aca su modulo principal
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { MomentModule } from 'angular2-moment';//para las fechas, darles formato
import { NgxHighlightJsModule } from '@nowzoo/ngx-highlight-js'; //para q se vea bien el codigo puesto en el foro

import { PanelModule } from './panel/panel.module'; //importamos nuetro submodulo panel
import { UserService } from './servicio/user.service'; 
import { UserGuard } from './servicio/user.guard'; //ambos ya que en userguard ocupamos userService, pa validar que si alla y no pueda escribir rutas en url
import { NoIdentityGuard } from './servicio/no.identity.guard'; //otro guard

import { AppComponent } from './app.component';
import { RegisterComponent } from './componentes/register/register.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { UserEditComponent } from './componentes/user-edit/user-edit.component';
import { TopicsComponent } from './componentes/topics/topics.component';
import { TopicDetailComponent } from './componentes/topic-detail/topic-detail.component';
import { UsersComponent } from './componentes/users/users.component';
import { UserDetailComponent } from './componentes/user-detail/user-detail.component';
import { SearchComponent } from './componentes/search/search.component';
// import { MainComponent } from './panel/componentes/main/main.component';//no ncesario q esten estas cuatro aca ya q se ocupan en el panel.routing
// import { AddComponent } from './panel/componentes/add/add.component';
// import { EditComponent } from './panel/componentes/edit/edit.component';
// import { ListComponent } from './panel/componentes/list/list.component';


@NgModule({
  declarations: [//aca se cargan los componentes, lo q sea q valla a representar akgo en la vista
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    TopicsComponent,
    TopicDetailComponent,
    UsersComponent,
    UserDetailComponent,
    SearchComponent,
    // MainComponent,
    // AddComponent,
    // EditComponent,
    // ListComponent
  ],
  imports: [//aca los modulos
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    PanelModule,
    MomentModule,
    NgxHighlightJsModule.forRoot()
  ],
  providers: [//aca los servicios
    appRoutingProviders,
    UserService,
    UserGuard,
    NoIdentityGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
