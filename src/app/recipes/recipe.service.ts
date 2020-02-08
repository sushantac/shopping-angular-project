import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { AppModule } from '../app.module';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  
  // [
  //   new Recipe('Chicken Tikka', "This is a spicy chicken dish",
  //     "https://cdn.pixabay.com/photo/2016/03/05/21/42/appetite-1239048_1280.jpg",
  //     [new Ingredient("Meat",1), new Ingredient("Curd",10)]),

  //   new Recipe('Spring roll', "This is a starter dish",
  //     "https://cdn.pixabay.com/photo/2017/08/25/15/10/egg-roll-2680478_1280.jpg",
  //     [new Ingredient("Flour",100), new Ingredient("Cabbage",1), new Ingredient("Carrot",2)])

  // ];

  recipeSelctionChanged: Subject<Recipe> = new Subject<Recipe>();

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>) { 

  }

  getRecipes(){
    return this.recipes.slice();
  }
  
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(recipe: Recipe, index: number){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }


  addIngredientsToShoppingList(ingredients: Ingredient[]){
    //this.shoppingService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
  getRecipe(index:number){
    return this.recipes[index];
  }

  updateRecipesList(updatedRecipes: Recipe[]){
    this.recipes = updatedRecipes;
    this.recipesChanged.next(this.recipes);
  }
  
}
