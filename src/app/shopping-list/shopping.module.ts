import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';
import { CommonModule } from '@angular/common';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingItemComponent,
    ],
    imports:[
        SharedModule,
        ShoppingRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ShoppingModule{
    
}