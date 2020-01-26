import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelctionChanged = new EventEmitter<Recipe>();
  
  recipes: Recipe[] = [
    new Recipe('Chicken Tikka', "This is a spicy chicken dish",
      "https://cdn.pixabay.com/photo/2016/03/05/21/42/appetite-1239048_1280.jpg"),

    new Recipe('Spring roll', "This is a starter dish",
      "https://cdn.pixabay.com/photo/2017/08/25/15/10/egg-roll-2680478_1280.jpg")

  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeItemSelctionChanged(recipe: Recipe){
    this.recipeSelctionChanged.emit(recipe);
  }

}
