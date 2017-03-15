import { Component,OnInit } from '@angular/core';
import {  Input,  trigger,  state,  style,  transition,  animate} from '@angular/core';

import {HeroService} from './hero.service';
import { Http } from '@angular/http';
import  {Bay,Story,User} from './hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('selectCard', [
      state('inactive', style({
        // backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({

        // backgroundColor: '#cfd8dc',
        margin: '50px 0 50px 0',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('200ms 100ms ease-in')),
      transition('active => inactive', animate('200ms 100ms ease-out'))
    ]),
   	trigger('shrinkOut', [
      state('in', style({height: '*'})),
      transition('* => void', [
        animate('300ms 100ms ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ]),
      transition('void => *', [
        style({height: 0}),
        animate(350, style({height: '*'}))
      ])
    ]),
    trigger('addAni', [
      state('add', style({
        // backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('done',   style({
        // backgroundColor: '#cfd8dc',
        transform: 'scale(1.2)'
      })),
      transition('add => done', animate('100ms ease-in')),
      transition('done => add', animate('100ms ease-out'))
    ])
  ]
})



export class HomeComponent implements OnInit{
  bay:Bay;
  user:User;
  title = '黄劲松的简历';
  // heroes:Hero[]=[];
  addflag:string='';
  goodtype='inactive';
  error: any;

  constructor( public router: Router,public http: Http, private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getUser();
    this.heroService.getBay(this.user)
      .then(rep=>{
        rep.storys.sort(( a: any, b: any ) => b.id-a.id);
        console.log(rep.storys);
        this.bay=rep;
        this.bay.storys.forEach(s=>s.flag='inactive');
      })
      .catch(error => this.error = error); 


  }

  getUser():void{
    // let body = JSON.stringify({name:'Michael',bayid:1,role:'教主' });
    // localStorage.setItem('sakura_user',body);
    if(localStorage.getItem('sakura_user') ){
      this.user=JSON.parse(localStorage.getItem('sakura_user'));
    }
  }

  selectCard(story:Story):void{
    if(story.flag==='inactive'){
      story.flag='active';  
    }else{
      story.flag='inactive'; 
    }
  }

  gotoStory(story:Story): void {
    this.router.navigate(['/story', story.id]);
  }

}
