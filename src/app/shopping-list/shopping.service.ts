import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private ingredients: Ingredient[] = [
    new Ingredient("Chicken", 10),
    new Ingredient("Curd", 20),
    new Ingredient("Oil", 11)
  ];

  shoppingListUpdated: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();

  getIngredients(){
    return this.ingredients.slice();
  }
  
  constructor() { }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);

    this.shoppingListUpdated.emit(this.ingredients);
  }

  addIngredients(ingredientsList: Ingredient[]){
    this.ingredients.push(...ingredientsList);

    this.shoppingListUpdated.emit(this.ingredients);
  }

}
