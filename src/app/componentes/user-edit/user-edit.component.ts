import { Component, OnInit } from '@angular/core';
// importar cosas necesarias
import { Router, ActivatedRoute, Params } from '@angular/router'; // para las rutas, para poder redirigir
import { User } from 'src/app/models/user';//importar el modelo
import { UserService } from 'src/app/servicio/user.service'; //importar el servicio de user
import { global } from 'src/app/servicio/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService],
})
export class UserEditComponent implements OnInit {
  // propiedades 
  public page_title: string;
  public user: User; //nuestro objeto de user
  public identity: any; //estas dos necesarias pa sacar y pones a estas propiedades al usuario
  public token:any;
  public status: any;
  public afuconfig: any; //pa el file-uploader
  public url:any;
  public resetVar = true; //declaramos esto para angular-file-uploader funcion

  constructor(
    // tipo instancias| inyectar
    private _router: Router,
    private _route:ActivatedRoute,
    private _userService: UserService,

  ) {
    // darle un valor a las propiedades
    this.page_title = "Ajustes de usuario";
    this.status = "";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity; //this.identity se lo ponemo a user y asi ya tenemos los datos del usuario identificado
    this.url = global.url;
    this.afuconfig = {
      //configurarlo del file-uploader, sacado de https://www.npmjs.com/package/angular-file-uploader
      multiple: false, //no multiples archivos
      formatsAllowed: ".jpg, .png, .gif, .jpeg", //formatos permitidos
      // maxSize: "50",//max 50 megas
      uploadAPI:  { //a que url vamos a enviar
        url: this.url+'upload-avatar',//donde esta la ruta del nuestra api, donde se va a subir el avatar
        // method:"POST",
        headers: {
        "Authorization" : this._userService.getToken(),//necesita q le enviemos el token 
        },
        // responseType: 'json',
      },
      theme: "attachPin",//attachPin el un tema normal
      hideProgressBar: false, //pa q nos muestre una barra de progreso
      hideResetBtn: true,
      hideSelectBtn: false,
      fileNameIndex: true,
      autoUpload: false,
      replaceTexts: {
        selectFileBtn: 'Selecciona el archivo',
        resetBtn: 'Quitar',
        uploadBtn: 'Subir',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Subir imagen...',
        afterUploadMsg_success: 'Subida exitosa!',
        afterUploadMsg_error: 'Error al intenter subir!',
        sizeLimit: 'Limite de espacio'
        }
      };
    }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    this._userService.update(this.user).subscribe(
      response =>{
        if (!response.user) { //validar, si no hay response de user error
          this.status = 'error';
        }else{ //sino success
          this.status = 'success'
          this.identity = this.user;//ahora la nueva identity sera user

          //actualizar los datos del localstorage
          localStorage.setItem('identity', JSON.stringify(this.user)); //le pasamos el user parseado a json string
        }
      },
      error =>{
        this.status = "error";
        console.log(error);
      }
    )
  }

  // metodo para subir la foto :D
  avatarUpload(data:any){
    // let data_obj = JSON.parse(data.response);//convertir a objeto usable pa javascript y ponerlo en data_obj

    let file = data.body.user.image;
    this.user.image = file; //y ahora de la image conseguida de la response se lo ponemos a user image :D
    // this.identity.image = file;
    console.log(this.user);

    // console.log(data.body.image);
    // let data_image = data.body.image;
    // this.user.image = data_image;//la imagen de user ahora sera la nueva data_image
    // this.identity.image = data_image;//de igual forma cambiamos la de identity image por la nueva imagen
  }

}
