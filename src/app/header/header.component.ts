import { Component, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:User = null;

  constructor(private dataService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.userSubject.subscribe( user => {
      this.user = user;
    });
  }

  onSaveData(){
    this.dataService.storeRecipes();
  }

  onFetchData(){
    this.dataService.fetchRecipes().subscribe();
  }
  
  onLogout(){
    this.authService.logout();
  }
}
