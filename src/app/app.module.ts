import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
} from 'angular5-social-login';
import { getAuthServiceConfigs } from 'socialloginConfig';
import { HomeComponent } from './home/home.component';
import { DataService } from './service/data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScenariosComponent } from './student/scenarios/scenarios.component';
import { CarouselComponent } from './student/carousel/carousel.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './student/calendar/calendar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ImplementsComponent } from './student/implements/implements.component';
import { BookingListComponent } from './admin/booking-list/booking-list.component';

const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Escenarios', component: ScenariosComponent },
  { path: 'prueba', component: CarouselComponent },
  { path: 'registro', component: SignInComponent },
  { path: 'implementos', component: ImplementsComponent },
  { path: 'reservas', component: BookingListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '*', redirectTo: 'login' }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ScenariosComponent,
    CarouselComponent,
    CalendarComponent,
    SignInComponent,
    ImplementsComponent,
    BookingListComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    SocialLoginModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
