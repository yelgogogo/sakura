import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Walk In Center';

  // constructor(public router: Router) {
  //   // missionService.missionConfirmed$.subscribe(
  //   //   astronaut => {
  //   //     this.history.push(`${astronaut} confirmed the mission`);
  //     // });
  // }

  ngOnInit(): void {
    // if(localStorage.getItem('rapper_language') ){
    //   let languageid=localStorage.getItem('rapper_language');
    //   this.page=APPPAGE.find(page=>page.id == languageid);
    // }
  }



}
