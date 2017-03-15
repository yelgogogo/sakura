import { Component,   OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Story,User } from './hero';
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
            .then(story => this.story = story);
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

  getUser():void{
    let body = JSON.stringify({name:'Michael',bayid:1,role:'教主' });
    localStorage.setItem('sakura_user',body);
    if(localStorage.getItem('sakura_user') ){
      this.user=JSON.parse(localStorage.getItem('sakura_user'));
      // this.story.owner=this.user.name;
      // this.story.bayid=this.user.bayid;
      // this.story.role=this.user.role;
    }
  }

  save(): void {
    //console.log(this.regarray);
    let today= new  Date();
    this.story.starttime = today.toLocaleString();
    this.heroService
        .saveStory(this.story)
        .then(story => {
          this.story = story; 
          this.goBack();
        })
        .catch(error => this.error = error); 
  }

  goBack(): void {
     window.history.back(); 
  }
}
