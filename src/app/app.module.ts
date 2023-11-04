import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RoutingRoutes } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatProgressBarModule} from '@angular/material/progress-bar';  
import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    RoutingRoutes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressBarModule,
    ClipboardModule,
    MatIconModule,
    MatTooltipModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
