import { Component, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:User = null;

  constructor(private dataService: DataStorageService, 
    private authService: AuthService, 
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('auth').subscribe( authState => {
      this.user = authState.user;
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
