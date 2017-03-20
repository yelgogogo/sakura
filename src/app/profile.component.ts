import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HeroService } from './hero.service';
import { User,Bay } from './hero';
import { FileUploader } from 'ng2-file-upload';
import { NODEUPLOAD } from './mock-data';
// import { contentHeaders } from '../common/headers';

@Component({
  selector: 'my-profile',
  templateUrl: 'profile.component.html',
  styleUrls: [ 'profile.component.css' ]
})
export class ProfileComponent implements OnInit{
  user:User;
  bay:Bay;
  error: any;


  public uploader:FileUploader = new FileUploader({url:NODEUPLOAD+'upload/'});
  public useruploader:FileUploader = new FileUploader({url:NODEUPLOAD+'upload/'});

  constructor(public router: Router, public http: Http, private heroService: HeroService) {
  }


  ngOnInit(): void {

    this.getUser();

    this.heroService.myBay(this.user)
      .then(rep=>{
        this.bay=rep;
      })
      .catch(error => this.error = error); 

    this.uploader.onCompleteItem = (item, response, status, header) => {
        if (status === 200) {      
            let resobj = JSON.parse(response);
            // element.filename=resobj.filename;
            this.bay.cover=NODEUPLOAD+resobj.path;
        }  
      };

    this.useruploader.onCompleteItem = (item, response, status, header) => {
        if (status === 200) {      
            let resobj = JSON.parse(response);
            // element.filename=resobj.filename;
            this.user.avatar=NODEUPLOAD+resobj.path;
            this.user.avatar=this.user.avatar.replace(/\\/g,'/');
        }  
      };
  }

  getUser():void{
    // let body = JSON.stringify({name:'Michael',bayid:1,role:'教主' });
    // localStorage.setItem('sakura_user',body);
    if(localStorage.getItem('sakura_user') ){
      this.user=JSON.parse(localStorage.getItem('sakura_user'));
    }
  }

  updateUser():void{
    let today= new  Date();
    this.user.updatetime = today.toLocaleString();
    this.heroService
        .updateUser(this.user)
        .then(user => {
          this.user = user; 
          // this.goBack();
        })
        .catch(error => this.error = error); 
  }

  updateBay():void{
    let today= new  Date();
    this.bay.updatetime = today.toLocaleString();
    this.heroService
        .updateBay(this.bay)
        .then(bay => {
          this.bay = bay; 
          // this.goBack();
        })
        .catch(error => this.error = error); 
  }

  goBack(): void {
     window.history.back(); 
  }
  
}