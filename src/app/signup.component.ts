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

  signup(event: any, user:string, password:string,nickname:string,bayid:number) {
    event.preventDefault();
    
    this.user.name=user;
    this.user.password=password;
    this.user.nickname=nickname;
    this.user.bayid=bayid;
    this.user.avatar='';
    
    this.heroService.postUser(this.user)
      .then(useri => 
        {
          this.user = useri;
          console.log(useri);
          // let name=this.user.name;
          // let email=this.user.email;
          // let body = JSON.stringify({name,email });
          // localStorage.setItem('rapper_token', body);
          this.router.navigate(['login']);
        });
  }

  login(event: any) {
    event.preventDefault();
    this.router.navigate(['login']);
  }
}