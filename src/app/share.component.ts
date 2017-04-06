import { Component, ViewChild,  EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Story,User,SubContent } from './hero';
import { HeroService } from './hero.service';
import { FileUploader } from 'ng2-file-upload';
import { NODEUPLOAD } from './mock-data';
// import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import {CropperSettings,ImageCropperComponent} from 'ng2-img-cropper';
// import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';

@Component({
  selector: 'my-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  // nodeupload=NODEUPLOAD;
  @Input() story: Story;
  @Output() close = new EventEmitter();
  // story:Story;
  navigated = false; // true if navigated here
  user:User;
  addsub=false;
  innerHeight: number;
  innerWidth: number;

  error: any;
  src: string = "";

  data: any;
  cropperSettings: CropperSettings;
  image: any;
  profileCropperSettings: CropperSettings;
  hasBaseDropZoneOver: boolean = false;
  hasAnotherDropZoneOver: boolean = false;

  public uploader:FileUploader = new FileUploader({url:NODEUPLOAD+'upload/'});


  @ViewChild('profileCropper', undefined)
    profileCropper: ImageCropperComponent;

  //@ViewChild('profileEditorModal') profileEditorModal:ModalDirective;


  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.innerWidth=window.screen.width;
    this.innerHeight=window.screen.height;

    if (this.story){
      this.navigated = false;
    }else{
      this.navigated = true;
      this.story = new Story();
      this.story.comments=[];
      this.story.subcontents=[];
      this.story.likes=[];
      this.story.coverthumbnail='';
      // console.log(this.story.coverthumbnail);
      // console.log(this.story);
    };

    this.getUser();

    this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = this.innerWidth-48;
        //this.cropperSettings.height = (this.cropperSettings.croppedWidth/16*9);
        this.cropperSettings.croppedWidth =this.innerWidth-48;
        this.cropperSettings.croppedHeight = (this.cropperSettings.croppedWidth/16*9);
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
 
        this.data = {};

    this.uploader.onAfterAddingFile = f => { 
            this.image = new Image();
            var file: File = f._file;//e.target.files[0];
            var fileReader: FileReader = new FileReader();
            var that = this;
            console.log(f);
            fileReader.onloadend = function (loadEvent: any) {
                that.image.src = loadEvent.target.result;
                that.profileCropper.setImage(that.image);  
                 
            };

            fileReader.readAsDataURL(file);
            console.log(this.image);
            console.log(this.data);
            
        }

    this.setuploader();
    this.uploader.onCompleteItem = (item, response, status, header) => {
        console.log(this.story);
        if (status === 200) {      
            let resobj = JSON.parse(response);
            // element.filename=resobj.filename;\
            console.log(this.addsub);
            if(this.addsub){
              let subc = this.story.subcontents[this.story.subcontents.length-1];
              subc.thumbnail=this.data;
              subc.illustration=NODEUPLOAD+resobj.path;
            }else{
              this.story.cover=NODEUPLOAD+resobj.path;
              this.story.coverthumbnail=this.data;
            }
            
            
        }  
      };

  }

  setuploader():void{
    this.uploader.onCompleteItem = (item, response, status, header) => {
        console.log(this.story);
        if (status === 200) {      
            let resobj = JSON.parse(response);
            // element.filename=resobj.filename;\
            console.log(this.addsub);
            if(this.addsub){
              let subc = this.story.subcontents[this.story.subcontents.length-1];
              subc.thumbnail=JSON.parse(JSON.stringify(this.data));
              subc.illustration=NODEUPLOAD+resobj.path;
              console.log(this.story);
            }else{
              this.story.cover=NODEUPLOAD+resobj.path;
              this.story.coverthumbnail=JSON.parse(JSON.stringify(this.data));
            }
            
            
        }  
      };
  }

  addSubcontent():void{
    this.addsub=true;
    this.setuploader();
    if(!this.story.subcontents){this.story.subcontents=[]};
    this.story.subcontents.push(new SubContent());

  }

  getUser():void{
    // let body = JSON.stringify({name:'Michael',bayid:1,role:'教主' });
    // localStorage.setItem('sakura_user',body);
    if(localStorage.getItem('sakura_user') ){
      this.user=JSON.parse(localStorage.getItem('sakura_user'));
      this.story.owner=this.user.name;
      this.story.ownerid=this.user.id;
      this.story.moneyimg=this.user.moneyimg;
      this.story.bayid=this.user.bayid;
      this.story.role=this.user.nickname;
      this.story.avatar=this.user.avatar;
      
    }
  }

  save(): void {
    console.log(this.story);
    
    if (this.story.description.length > 60){
      this.story.subtitle=this.story.description.substr(0,60)+'...';
    }else{
      this.story.subtitle=this.story.description.substr(0,60);   
    }
    
    let today= new  Date();
    this.story.starttime = today.toLocaleString();
    this.heroService
        .saveStory(this.story)
        .then(story => {
          this.story = story; 
          console.log(this.story);
          this.goBack();
        })
        .catch(error => this.error = error); 
  }

  goBack(): void {
     window.history.back(); 
  }
}
