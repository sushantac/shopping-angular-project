import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  featureActive: string = 'recipe';


  onNavigate(sectionName: string){
    this.featureActive = sectionName;
  }
}
