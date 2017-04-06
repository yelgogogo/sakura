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
import {FileUploadModule} from "ng2-file-upload/file-upload/file-upload.module";
// import { ImageUploadModule } from 'ng2-imageupload';
//import {ImageCropperComponent} from 'ng2-img-cropper';
import {ImageCropperModule} from 'ng2-img-cropper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import './rxjs-extensions';

@NgModule({
  declarations: [
    AppComponent,
    
    //ImageCropperComponent,
    routedComponents
   
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    FileUploadModule,
    ImageCropperModule ,
    // InMemoryWebApiModule.forRoot(InMemoryDataService,{delay:600}),
    HttpModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
