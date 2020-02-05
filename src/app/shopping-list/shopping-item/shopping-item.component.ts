import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { format } from 'url';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit, OnDestroy {

  constructor(private shoppingService: ShoppingService) { }

  @ViewChild('f', {static: false}) form: NgForm;

  editMode: boolean;
  editedItem: Ingredient;
  editedIndex: number;

   ngOnInit() {
    this.shoppingService.startedEditing.subscribe((index: number) => {
      console.log("reached..." + index);
      this.editedItem = this.shoppingService.getIngredient(index);
      this.editedIndex = index;
      this.editMode = true;
      this.form.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount});
    });
  }

  onAdd(form: NgForm){
    const value = form.value; 
    var item = new Ingredient(value.name, value.amount);
    
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedIndex, item);
    }else{
      this.shoppingService.addIngredient(item);
    }
    
    this.form.reset();
    this.editMode = false;
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.editedIndex);
    this.form.reset();
    this.editMode = false;
  }


  ngOnDestroy(){

  }
}
