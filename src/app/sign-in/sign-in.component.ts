import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  loading = false;
  contra = false;
  mensaje = '';

  constructor(private router: Router, public _data: DataService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmarPassword: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required)
    });
  }

  verificacion() {
    if (this.form.value.password !== this.form.value.confirmarPassword) {
      this.contra = false;
    } else {
      this.contra = true;
    }
  }

  send() {
    this._data.postSignin(this.form.value).subscribe(
      (Response: any) => {
        this._data.postLogin({ email: this.form.value.correo, password: this.form.value.password }).subscribe(
          (response: any) => {
            if (response.status === 'success') {
              localStorage.setItem('token', Response.message);
              this._data.login = true;
              this.router.navigate(['/home']);
            }
          }, (error: any) => {
            console.log(error);
          }
        );
      }, (error: any) => {
        console.log(error);
        if (error.error.errors[0] === 'The email has already been taken.') {
          this.mensaje = 'El email ya existe en la base de datos.';
        }
      }
    );
  }

}
