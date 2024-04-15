import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {MockDataService} from "./services/mock-data.service";
import { InfoCardComponent } from './components/info-card/info-card.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ErrorComponent } from './components/error/error.component';
import {ErrorInterceptor} from "./interceptors/error.interceptor";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(MockDataService),
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    UserComponent,
    InfoCardComponent,
    ErrorComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
