import { Injectable } from '@angular/core';
import { Headers, Http, Response,URLSearchParams } from '@angular/http';
//import {  } from '@angular/http';
// import { InMemoryDataService } from './in-memory-data.service';
import 'rxjs/add/operator/toPromise';

import { Bay,Story} from './hero';


@Injectable()
export class HeroService {

	HOST='http://localhost:3200/';
	constructor(private http: Http) { }
  //private workspacesUrl = HOST+'workspaces';  // URL to web api Workspaces
	private bayUrl = this.HOST +'bay';
  private storyUrl = this.HOST +'story';
  private storybyidUrl = this.HOST+'storybyid';

	getClas(): Promise<Bay> {
  return this.http
  	.get(this.bayUrl)
  	.toPromise()
  	.then(response => 
  		{ console.log(response.json().data);
  			return response.json().data[0] as Bay;})
  	.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error);
	    return Promise.reject(error.message || error);
	}

  saveStory(story: Story): Promise<Story> {
    // if (story.id) {
    //   return this.putStory(story);
    // }
    return this.postStory(story);
  }
  // Add new Story
  private postStory(story: Story): Promise<Story> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.log(story);
    return this.http
      .post(this.storyUrl, JSON.stringify(story), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getStoryById(inid: number): Promise<Story> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', JSON.stringify({id:inid}));

    return this.http
      .get(this.storybyidUrl,{ search: params })
      .toPromise()
      .then(response => response.json() as Story)
      .catch(this.handleError);
  }

}