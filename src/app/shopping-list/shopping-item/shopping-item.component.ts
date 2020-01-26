import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {

  @ViewChild("nameInput", {static: true}) nameInput: ElementRef;
  @ViewChild("amountInput", {static: true}) amountInput: ElementRef;

  @Output() shoppingItemAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {

  }

  onAdd(){

    var item = new Ingredient(this.nameInput.nativeElement.value, 
      this.amountInput.nativeElement.value);

    this.shoppingItemAdded.emit(item);
  }

}
