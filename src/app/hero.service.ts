import { Injectable } from '@angular/core';
import { Headers, Http, Response,URLSearchParams } from '@angular/http';
//import {  } from '@angular/http';
// import { InMemoryDataService } from './in-memory-data.service';
import 'rxjs/add/operator/toPromise';
import  {HOST} from './mock-data'

import { Bay,Story,StoryComment,User} from './hero';


@Injectable()
export class HeroService {

	// HOST='http://localhost:3200/';
	constructor(private http: Http) { }
  //private workspacesUrl = HOST+'workspaces';  // URL to web api Workspaces
	private bayUrl = HOST +'bay';
  private mybayUrl = HOST +'mybay';
  private storyUrl = HOST +'story';
  private commentUrl = HOST +'comment';
  private storybyidUrl = HOST+'storybyid';
  private userbynameUrl = HOST+'userbyname';
  private usersUrl = HOST+'users';

	getBay(user:User): Promise<Bay> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('user', JSON.stringify({bayid:user.bayid}));

    return this.http
      .get(this.bayUrl,{ search: params })
    	.toPromise()
    	.then(response => 
    		{ console.log(response.json().data);
    			return response.json().data as Bay;})
    	.catch(this.handleError);
	}

  myBay(user:User): Promise<Bay> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('user', JSON.stringify({id:user.id,bayid:user.bayid}));

    return this.http
      .get(this.mybayUrl,{ search: params })
      .toPromise()
      .then(response => 
        { console.log(response.json().data);
          return response.json().data as Bay;})
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

  // update Bay with cover and name
  updateBay(bay: Bay): Promise<Bay> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.log(bay);
    let updatebayurl = `${this.bayUrl}/${bay.id}`;
    return this.http
      .put(updatebayurl, JSON.stringify(bay), { headers: headers })
      .toPromise()
      .then(res => res.json().data as Bay)
      .catch(this.handleError);
  }

  //get story by id
  getStoryById(inid: number): Promise<Story> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', JSON.stringify({id:inid}));

    return this.http
      .get(this.storybyidUrl,{ search: params })
      .toPromise()
      .then(response => response.json().data as Story)
      .catch(this.handleError);
  }

  // delete Story
  deleteStory(story:Story,user: User): Promise<Story> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('parm', JSON.stringify({user:user}));
    let url = `${this.storyUrl}/${story.id}`;

    return this.http
      .delete(url, { search: params })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
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

  saveComment(comment: StoryComment): Promise<Story> {
    // if (story.id) {
    //   return this.putStory(story);
    // }
    return this.postComment(comment);
  }
  // Add new Comment
  private postComment(comment: StoryComment): Promise<Story> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.log(comment);
    return this.http
      .post(this.commentUrl, JSON.stringify(comment), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  

  //add new user
  postUser(user: User): Promise<User> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.usersUrl, JSON.stringify(user), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
      
  }

  // update User with cover and name
  updateUser(user: User): Promise<User> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.log(user);
    let updateurl = `${this.usersUrl}/${user.id}`;
    return this.http
      .put(updateurl, JSON.stringify(user), { headers: headers })
      .toPromise()
      .then(res => res.json().data as User)
      .catch(this.handleError);
  }

  getUserByName(user: User): Promise<User> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('user', JSON.stringify(user));

    return this.http
      .get(this.userbynameUrl,{ search: params })
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

}