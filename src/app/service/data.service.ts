import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  datos: any;
  user: string = 'admin';
  idUser = 9;
  login = false;
  url = 'http://192.168.0.10:8888';
  constructor(private http: HttpClient) {
  }

  postLogin(login): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
    .set('json', JSON.stringify({email: login.email, password: login.password}));
    return this.http.post(`${this.url}/Salires/api-rest-laravel/public/api/login`, body);
  }

  postValidation(body): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')
    );
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(`${this.url}/Salires/api-rest-laravel/public/api/user/update`, body);
  }

  postSignin(signup): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
    .set('json', JSON.stringify({name: signup.nombre, surname: signup.apellido,
      email: signup.correo, password: signup.password, user_type: signup.userType}));
    return this.http.post(`${this.url}/Salires/api-rest-laravel/public/api/register`, body);
  }

  getScenarios(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams();
    return this.http.get(`${this.url}/Salires/api-rest-laravel/public/api/escenarios`);
  }

  getReserva(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(`${this.url}/Salires/api-rest-laravel/public/api/reserva/${id}`);
  }


  postReserva(reserva): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
    .set('json', reserva);
    return this.http.post(`${this.url}/Salires/api-rest-laravel/public/api/reserva/crear`, body);
  }

  getBooking(estado): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(`${this.url}/Salires/api-rest-laravel/public/api/reserva/pendientes/${estado}`);
  }

  updateEstadoReserva(estado): Observable<any> {
    console.log(estado);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
    .set('json', JSON.stringify(estado));
    return this.http.post(`${this.url}/Salires/api-rest-laravel/public/api/reserva/actualizar`, body);
  }

}
