import { Component,OnInit,OnDestroy } from '@angular/core';
import { MissionService }     from './mission.service';
import { Subscription }   from 'rxjs/Subscription';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MissionService]
})
export class AppComponent implements OnInit,OnDestroy{

  nightmode=false;
  subscription: Subscription;
  constructor(private missionService: MissionService) {
    this.subscription = missionService.modeChanged$.subscribe(
      mission => {
        this.nightmode=mission;
        // console.log(this.nightmode);
    });
  }

  ngOnInit(): void {
    // this.nightmode=this.missionService.share;
    // if(localStorage.getItem('rapper_language') ){
    //   let languageid=localStorage.getItem('rapper_language');
    //   this.page=APPPAGE.find(page=>page.id == languageid);
    // }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    console.log('ngOnDestroy');
    this.subscription.unsubscribe();
  }

}
