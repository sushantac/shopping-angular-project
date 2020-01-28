import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesComponent } from './recipes.component';
import { AppModule } from '../app.module';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Chicken Tikka', "This is a spicy chicken dish",
      "https://cdn.pixabay.com/photo/2016/03/05/21/42/appetite-1239048_1280.jpg",
      [new Ingredient("Meat",1), new Ingredient("Curd",10)]),

    new Recipe('Spring roll', "This is a starter dish",
      "https://cdn.pixabay.com/photo/2017/08/25/15/10/egg-roll-2680478_1280.jpg",
      [new Ingredient("Flour",100), new Ingredient("Cabbage",1), new Ingredient("Carrot",2)])

  ];

  getRecipes(){
    return this.recipes.slice();
  }
  
  recipeSelctionChanged: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  
  constructor(private shoppingService: ShoppingService) { }


  addIngredientsToShoppingList(ingredients: Ingredient[]){
    // ingredients.forEach(element => {
    //   this.shoppingService.addIngredient(element);
    // });
    
    this.shoppingService.addIngredients(ingredients);
  }

  getRecipe(index:number){
    return this.recipes[index];
  }
  
}
