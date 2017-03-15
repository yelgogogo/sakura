import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';
import { HeroService } from './hero.service';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import './rxjs-extensions';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService,{delay:600}),
    HttpModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
