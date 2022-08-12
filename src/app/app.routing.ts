// documento de rutas propio

// 1. importar los modulos del router, para trabajar con el router
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; //espo va a permitir estableces una ruta dentro de  configuracion al routing para q funcione
import { UserGuard } from './servicio/user.guard';
import { NoIdentityGuard } from './servicio/no.identity.guard'; //otro guard

// 2. importar todos los 'componentes' no de panel
import { LoginComponent } from "./componentes/login/login.component";
import { RegisterComponent } from "./componentes/register/register.component";
import { HomeComponent } from './componentes/home/home.component';
import { UserEditComponent } from "./componentes/user-edit/user-edit.component";
import { TopicsComponent } from './componentes/topics/topics.component';
import { TopicDetailComponent } from "./componentes/topic-detail/topic-detail.component";
import { UsersComponent } from "./componentes/users/users.component";
import { UserDetailComponent } from "./componentes/user-detail/user-detail.component";
import { SearchComponent } from './componentes/search/search.component';


// 3. Array de rutas, que las pasamos por los routerlinks y se ponen en la url y nos mandan a tal conponente
const appRoutes: Routes = [//esto es un array de objetos json
    {path: '',component: HomeComponent}, //q cuando no halla nada en la ruta, le dirijaa login
    {path: 'login',canActivate:[NoIdentityGuard],component: LoginComponent},
    {path: 'register',canActivate:[NoIdentityGuard],component: RegisterComponent},
    {path: 'home',component: HomeComponent},
    {path: 'ajustes',canActivate:[UserGuard],component: UserEditComponent}, //le agrgamos el guard pa qe no puede escrbir la ruta e ir alla sin q este logueado
    {path: 'temas',component: TopicsComponent},//los temas
    {path: 'temas/:page',component: TopicsComponent},// los temas, le pasamos el id(la pagina) por la ruta
    {path: 'tema/:id',component: TopicDetailComponent},// un tema en especifico, le pasamos el id por la ruta
    {path: 'usuarios', component: UsersComponent}, //la ruta de los usuarios
    {path: 'perfil/:id', component: UserDetailComponent}, //la ruta de detalle de los usuarios
    {path: 'buscar/:search', component: SearchComponent}, //la ruta de busqueda
    {path: '**',component: LoginComponent}, //si pone una ruta q no exite, lo mande a login
];

// 4. Exportar configuracion
export const appRoutingProviders: any[] = []; //q sea un array vacio , pa poner esto en modo de servicio
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);// forRoot va a permitit cargar toda la conguracion de rutas que hemos definido en approutes