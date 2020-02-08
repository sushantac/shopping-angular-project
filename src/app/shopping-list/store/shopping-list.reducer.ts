import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

export interface State {

    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;

}

const initialState : State = {

    ingredients: [
        new Ingredient("Chicken", 10),
        new Ingredient("Curd", 20),
        new Ingredient("Oil", 11)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1

};

export function shoppingListReducer(
    state: State = initialState, 
    action: ShoppingListActions.ShoppingListActions
    ){
        switch(action.type){
            case ShoppingListActions.ADD_INGREDIENT:
                
                return {
                    ...state, 
                    ingredients: [...state.ingredients, action.payload] 
                };


            
            case ShoppingListActions.ADD_INGREDIENTS:
                console.log(action.payload);
                console.log(...(<Ingredient[]>action.payload));

                return {
                    ...state, 
                    ingredients: [...state.ingredients, ...(<Ingredient[]>action.payload)] 
                };

            case ShoppingListActions.UPDATE_INGREDIENT:
                const originalIngredient = state.ingredients[state.editedIngredientIndex];
                const newIngredient:Ingredient = <Ingredient>action.payload;

                const updatedIngredient = {
                    ...originalIngredient, ...newIngredient
                }

                const updatedIngredients = [...state.ingredients];
                updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
                
                return {
                    ...state, 
                    ingredients: updatedIngredients,
                    editedIngredient: null,
                    editedIngredientIndex: -1 
                };

            case ShoppingListActions.DELETE_INGREDIENT:
        
                return {
                    ...state, 
                    ingredients: state.ingredients.filter( (ingre, index) => {
                        return index != state.editedIngredientIndex;
                    }),
                    editedIngredient: null,
                    editedIngredientIndex: -1
                };

            case ShoppingListActions.START_INGREDIENT_EDIT:
                
                return {
                    ...state, 
                    editedIngredientIndex: action.payload,
                    editedIngredient: { ...state.ingredients[<number>action.payload]}
                };

            case ShoppingListActions.STOP_INGREDIENT_EDIT:
    
                return {
                    ...state, 
                    editedIngredientIndex: -1,
                    editedIngredient: null
                };

            default:
                return state;
        }
}