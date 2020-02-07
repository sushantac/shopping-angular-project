import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { ActivatedRouteSnapshot} from '@angular/router';
import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{
 
  constructor(private recipeService: RecipeService, private dataService: DataStorageService){

  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

    console.log("In the resolver...");
    const recipes = this.recipeService.getRecipes();

    if(recipes && recipes.length === 0){
      console.log("Data is not there.. fetch it...");
      return this.dataService.fetchRecipes();
    }else{
      return recipes;
    }
  }
  
}
