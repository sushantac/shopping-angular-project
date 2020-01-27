import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {

  @ViewChild("nameInput", {static: true}) nameInput: ElementRef;
  @ViewChild("amountInput", {static: true}) amountInput: ElementRef;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
  }

  onAdd(){
    var item = new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value);

    this.shoppingService.addIngredient(item);
  }

}
