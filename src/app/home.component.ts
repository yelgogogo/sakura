import { Component,OnInit } from '@angular/core';
import {  Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger,  state,  style,  transition,  animate } from '@angular/animations'

import {HeroService} from './hero.service';
import { Http } from '@angular/http';
import  {Bay,Story,User,People} from './hero';
import { Router } from '@angular/router';
import { MissionService }     from './mission.service';

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
  // @HostListener('scroll', ['$event']) private onScroll($event:Event):void {
  //   console.log($event.srcElement.scrollLeft, $event.srcElement.scrollTop);
  // };

  bay:Bay;
  user:User;
  title = '黄劲松的简历';
  // heroes:Hero[]=[];
  addflag:string='';
  goodtype='inactive';
  error: any;
  innerHeight: number;
  goldHeight: number;
  innerWidth: number;


  constructor( public router: Router,public http: Http,private route: ActivatedRoute, private heroService: HeroService,private missionService: MissionService) {
  }

  ngOnInit(): void {
    this.innerWidth=window.screen.width;
    this.goldHeight=Math.floor(this.innerWidth/16*9);
    this.innerHeight=window.screen.height;

    this.getUser();
    // console.log(this.route.queryParams.forEach((params: Params) => {
    //   console.log(params);}));
    // console.log(this.route.queryParams);
    this.route.params.forEach((params: Params) => {
      console.log(params);
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.user.bayid=id;
      } else {
      }
    });

    
    
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
    }else{
      this.user= new User();
      this.user.id=Date.now();
      this.user.nickname="访客";
      this.user.avatar="https://www.starstech.tech:3201/uploads/defaultuser.jpg";
      this.user.badge=0;
      let body = JSON.stringify(this.user);
      localStorage.setItem('sakura_user', body);
    }

    this.route.queryParams.forEach((params: Params) => {
      console.log(params);
      console.log(params['code']);
      if (params['code'] !== undefined) {
        let code = params['code'];
        this.heroService.getWxUser(code)
          .then(r=>{
            console.log(r);
            this.user.nickname=r.nickname;
            this.user.sex=r.sex;
            this.user.avatar=r.headimgurl;
            this.user.token=r.openid;
            let body = JSON.stringify(this.user);
            localStorage.setItem('sakura_user', body);
          })
          .catch(error => this.error = error);
      } else {
      }
    });
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

  gotoShare(): void {
    this.router.navigate(['/share']);
  }

  gotoProfile(): void {
    this.router.navigate(['/profile']);
  }

  deleteStory(story:Story,user:User):void{
    let today= new  Date();
    // story.updatetime = today.toLocaleString();
    this.heroService
        .deleteStory(story,user)
        .then(repstory => {
          // console.log(story);
          this.bay.storys=this.bay.storys.filter(f=>f.id!==story.id)
        })
        .catch(error => this.error = error); 
  }

  changeMode(select:boolean):void{
    if (select){
      this.user.nightmode=false;
    }else{
      this.user.nightmode=true;
    }
    this.missionService.changeMode(this.user.nightmode);
    let body = JSON.stringify(this.user);
    localStorage.setItem('sakura_user', body);
  }

  logOut(event: any) :void{
    event.preventDefault();
    this.router.navigate(['login']);
  }

  onScroll(event: any) :void{
    console.log(event);
    event.preventDefault();
    // this.router.navigate(['login']);
  }

  likeDone(user:User,story:Story):boolean{
    if (!story.likes){story.likes=[]};
    let pushcheck=story.likes.find(function(f){return f.id===user.id});
    let rtn = false;
    if (pushcheck){
      rtn=true;
    }
    return rtn;
  }

  like(story:Story):void{
    let people = new People();
    people.id=this.user.id;
    people.nickname=this.user.nickname;
    people.avatar=this.user.avatar;
    //people.token=this.user.token;
    if (!story.likes){story.likes=[]};
    let pushcheck=story.likes.find(f=> f.id===people.id );
    if (!pushcheck){
      let savestory=new Story();
      savestory.id=story.id;
      savestory.likes=[people];
      this.heroService
        .pushLike(savestory)
        .then(sty => {
          story = sty; 
        })
        .catch(error => this.error = error);
    }
  }

  doSwipe(direction: string) {
            alert(direction);
        }
}
