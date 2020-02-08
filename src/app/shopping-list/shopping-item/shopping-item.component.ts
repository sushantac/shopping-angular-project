import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping-list.action';


@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  @ViewChild('f', {static: false}) form: NgForm;

  editMode: boolean;
  editedItem: Ingredient;
  editedIndex: number;
  subscription:Subscription;

  ngOnInit() {

    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });

  }

  onAdd(form: NgForm){
    const value = form.value; 
    var item = new Ingredient(value.name, value.amount);
    
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(item));
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(item));
    }
    
    this.form.reset();
    this.editMode = false;
  }

  onClear(){
    this.form.reset();
    this.editMode = false;

    this.store.dispatch(new ShoppingListActions.StopIngredientEdit());
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());

    this.form.reset();
    this.editMode = false;
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
