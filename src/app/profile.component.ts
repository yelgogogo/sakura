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
  newbay:Bay;
  error: any;


  public uploader:FileUploader = new FileUploader({url:NODEUPLOAD+'upload/'});
  public useruploader:FileUploader = new FileUploader({url:NODEUPLOAD+'upload/'});
  public newuploader:FileUploader = new FileUploader({url:NODEUPLOAD+'upload/'});

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

    this.newuploader.onCompleteItem = (item, response, status, header) => {
      if (status === 200) {      
          let resobj = JSON.parse(response);
          // element.filename=resobj.filename;
          this.newbay.cover=NODEUPLOAD+resobj.path;
       
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
    console.log(this.user);
    this.user.updatetime = today.toLocaleString();
    // this.user.bayid=Number(this.user.bayid);
    
    this.heroService
      .updateUser(this.user)
      .then(user => {
        this.user = user; 
        if(user.on_err){

        }else{
          let body = JSON.stringify(this.user);
          localStorage.setItem('sakura_user', body);

          this.heroService.myBay(this.user)
            .then(rep=>{
              this.bay=rep;
              console.log(rep);
            })
            .catch(error => this.error = error); 
          console.log(user);

        }
        
        // this.goBack();
      })
      .catch(error => this.error = error); 
  }

  add():void{
    this.newbay=new Bay();
    this.newbay.creater = this.user.nickname;
    this.newbay.createrid = this.user.id;
  }

  addBay(newbay:Bay):void{
    let today= new  Date();
    newbay.starttime = today.toLocaleString();
    newbay.updatetime = today.toLocaleString();
    newbay.people=[];
    newbay.storys=[];
    this.heroService
        .newBay(this.newbay)
        .then(bay => {
          this.newbay = bay; 
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