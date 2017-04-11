import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HeroService } from './hero.service';
import { User } from './hero';
// import { contentHeaders } from '../common/headers';

@Component({
  selector: 'my-signup',
  templateUrl: 'signup.component.html',
  styleUrls: [ 'signup.component.css' ]
})
export class SignupComponent implements OnInit{
  user:User;

  constructor(public router: Router, public http: Http, private heroService: HeroService) {
  }


  ngOnInit(): void {

    this.user= new User();
  }

  signup(event: any, user:string, password:string,nickname:string,bayid:string) {
    event.preventDefault();
    
    this.user.name=user;
    this.user.password=password;
    this.user.nickname=nickname;
    this.user.invitekey=bayid;
    this.user.badge=1;
    this.user.avatar=this.user.avatar="https://www.starstech.tech:3201/uploads/defaultuser.jpg";
    this.heroService.postUser(this.user)
      .then(useri => 
        {
          this.user = useri;
          console.log(useri);
          // let name=this.user.name;
          // let email=this.user.email;
          // let body = JSON.stringify({name,email });
          // localStorage.setItem('rapper_token', body);
          if(useri.on_err){
            console.log(useri.on_err);
          }else{
            this.router.navigate(['login']);
          }
          
        });
  }

  login(event: any) {
    event.preventDefault();
    this.router.navigate(['login']);
  }
}