import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Output() recipeItemSelectedEvent = new EventEmitter<Recipe>();

  @Input() recipe:Recipe;
  
  constructor() { }

  ngOnInit() {
  }

  onRecipeItemSelected(selectedRecipe: Recipe){
    this.recipeItemSelectedEvent.emit(selectedRecipe);
  }

}
