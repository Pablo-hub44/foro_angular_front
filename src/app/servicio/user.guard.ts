import { Injectable } from '@angular/core'; //esto va a permitir inyectar este servicio dentro de una propiedad en cualquier componente
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'; //pa las rutas, Router para redireccionar, ActivatedRoute para sacar los params de tal ruta
import { Observable } from 'rxjs';
import { UserService } from 'src/app/servicio/user.service';
@Injectable({
    providedIn: 'root'
})
// el canactivate hace que esto se pueda aplicar automaticamente a las rutas, pk en las rutas tenemos esa propiedad
export class UserGuard implements CanActivate{
    // las propiedades
    constructor(
        // instancias|inyecciones de nuestras dependencias
        private _router: Router,
        private _userService: UserService,
    ){}
    canActivate(){
        let identity = this._userService.getIdentity();

        if (identity && identity.name) {//validamos que halla la identity
            return true; //osea que puede seguir y ejecutar el componente que hay en la ruta
        }else{
            this._router.navigate(['/']);//si no hay, que nos rediriga a la ruta que sea / home
            return false;//no pasa
        }
    }
}