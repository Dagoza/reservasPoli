import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  AuthService
} from 'angular5-social-login';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensaje = '';
  form: FormGroup;

  constructor(private router: Router, private socialAuthService: AuthService, private Data: DataService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  send() {
    if (!this.form.valid) {
      this.mensaje = 'Datos inválidos.';
    } else {
      console.log(this.form.value);
      this.Data.postLogin(this.form.value).subscribe(
        (Response: any) => {
          console.log(Response);
          if (Response.status === 'success') {
            localStorage.setItem('token', Response.message);
            this.Data.login = true;
            this.Data.user = 'student';
            this.Data.datos = {name: 'Prueba'};
            this.router.navigate(['/home']);
          } else {
            this.mensaje = 'Usuario o contraseña incorrecto.';
          }
        }, (error: any) => {
          console.log(error);
        }
      );
    }
  }

  public signInGoogle() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider)
      .then((userData) => {
        this.Data.datos = userData;
        this.Data.login = true;
        this.Data.user = 'student';
        // post backend
        this.router.navigate(['/home']);
        //on success
        //this will return user data from google. What you need is a user token which you will send it to the server
        console.log(userData);
        //this.sendToRestApiMethod(userData.idToken);
      });
  }


}
