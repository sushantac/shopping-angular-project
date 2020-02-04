import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private ingredients: Ingredient[] = [
    new Ingredient("Chicken", 10),
    new Ingredient("Curd", 20),
    new Ingredient("Oil", 11)
  ];

  shoppingListUpdated: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  startedEditing: Subject<number> = new Subject<number>();
  
  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(i: number){
    return this.ingredients[i];
  }
  
  constructor() { }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);

    this.shoppingListUpdated.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;

    this.shoppingListUpdated.next(this.ingredients.slice());
  }
  
  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);

    this.shoppingListUpdated.next(this.ingredients.slice());
  }

  addIngredients(ingredientsList: Ingredient[]){
    this.ingredients.push(...ingredientsList);

    this.shoppingListUpdated.next(this.ingredients);
  }

}
