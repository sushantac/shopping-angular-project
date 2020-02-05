import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  
  ingredientsChangeSubscription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();

    this.ingredientsChangeSubscription = this.shoppingService.shoppingListUpdated.subscribe((ingredientsList: Ingredient[]) =>{
      this.ingredients = ingredientsList;
    });
    
  }

  ngOnDestroy(){
    this.ingredientsChangeSubscription.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingService.startedEditing.next(index);
  }

}
