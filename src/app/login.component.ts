import { Component,OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HeroService } from './hero.service';
import { User } from './hero';
import { MissionService } from './mission.service';
import { Subscription }   from 'rxjs/Subscription';
// import { contentHeaders } from '../common/headers';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ]
})
export class LoginComponent implements OnInit,OnDestroy{
  user:User;
  remember=false;
  userstore:User;
  nightmode=false;
  innerHeight:number;
  subscription: Subscription;

  constructor(public router: Router, public http: Http, private heroService: HeroService, private missionService: MissionService) {
    this.subscription = missionService.modeChanged$.subscribe(
      mission => {
        // this.page=LOGINPAGE.find(page=>page.id == mission);
        this.nightmode=mission;
    });

  }


  ngOnInit(): void {
    this.innerHeight=window.screen.height;

    // if(localStorage.getItem('rapper_language') ){
    //   let languageid=localStorage.getItem('rapper_language');
    //   this.page=LOGINPAGE.find(page=>page.id == languageid);
    // }

    this.user= new User();

    if(localStorage.getItem('sakura_user')){
      this.userstore=JSON.parse(localStorage.getItem('sakura_user'));
      // //console.log(this.userstore);
      if (this.userstore.remember){
        this.user=  this.userstore;
        this.remember=true;
      }    
    }
    this.nightmode=this.missionService.share;
    // //console.log(this.missionService.modeChanged$);
    // //console.log(this.missionService.share);
  }

  login(event: any, user:string, password:string) {
    event.preventDefault();
    
    this.user.name=user;
    this.user.password=password;
    
    this.heroService.getUserByName(this.user)
      .then(useri => 
        {
          console.log(useri);
          if(useri){
            this.user=useri;

            this.user.token="login";
            // this.user.name = user;
            this.user.remember = this.remember;
            if(this.remember){

            }else{
              this.user.password='';
            }
            this.missionService.Login(true);
            let body = JSON.stringify(this.user);
            localStorage.setItem('sakura_user', body);
            // //console.log('login');
            // //console.log(this.user);
            this.router.navigate(['home']);
          }
        });
  }

  signup(event: any) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }


  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}