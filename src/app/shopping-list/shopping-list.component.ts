import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient("Chicken", 10),
    new Ingredient("Curd", 20),
    new Ingredient("Oil", 11)
  ];

  constructor() { }

  ngOnInit() {
  }

  onShoppingItemAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }

}
