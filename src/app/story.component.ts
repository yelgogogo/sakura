import { Component,   OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Story,User,StoryComment } from './hero';
import { HeroService } from './hero.service';
// import { FileUploader } from 'ng2-file-upload';
import { NODEUPLOAD } from './mock-data';

@Component({
  moduleId: module.id,
  selector: 'my-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  // nodeupload=NODEUPLOAD;
  story:Story;
  user:User;
  error: any;
  newcomment:StoryComment;
  editstory=false;
  // public uploader:FileUploader = new FileUploader({url:NODEUPLOAD+'upload/'});

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.story = new Story();
    this.getUser();

    this.route.params.forEach((params: Params) => {

      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.heroService.getStoryById(id)
            .then(story => {this.story = story;
              console.log(story);
              // this.story.description=this.story.description.replace(/\n/g,'<br />');
            });
      } else {
      }
    });

    // this.uploader.onCompleteItem = (item, response, status, header) => {
    //     console.log(this.story);
    //     if (status === 200) {      
    //         let resobj = JSON.parse(response);
    //         // element.filename=resobj.filename;
    //         this.story.cover=NODEUPLOAD+resobj.path;
    //     }  
    //   };

  }

  addComment():void{
    this.newcomment=new StoryComment();
    this.newcomment.owner=this.user.name;
    this.newcomment.ownerid=this.user.id;
    this.newcomment.role=this.user.nickname;
    this.newcomment.avatar=this.user.avatar;
    this.newcomment.storyid=this.story.id;
  }

  getUser():void{
    if(localStorage.getItem('sakura_user') ){
      this.user=JSON.parse(localStorage.getItem('sakura_user'));
    }
  }

  deleteStory(story:Story,user:User):void{
    let today= new  Date();
    this.story.updatetime = today.toLocaleString();
    this.heroService
        .deleteStory(story,user)
        .then(story => {
          // console.log(story);
          this.story = story;
          this.goBack();
        })
        .catch(error => this.error = error); 
  }

  editStory(): void {

    this.editstory=true;
  }

  close(savedHero: Story): void {
    this.editstory = false;
    // if (savedHero) { this.getHeroes(); }
  }

  saveComment(): void {
    // console.log(this.newcomment);
    let today= new  Date();
    this.newcomment.starttime = today.toLocaleString();
    this.heroService
        .saveComment(this.newcomment)
        .then(story => {
          console.log(story);
          this.story = story; 

          this.newcomment=null;
          // this.goBack();
        })
        .catch(error => this.error = error); 
  }

  goBack(): void {
     window.history.back(); 
  }
}
