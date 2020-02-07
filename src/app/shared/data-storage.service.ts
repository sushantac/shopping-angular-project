import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: "root"})
export class DataStorageService{

    rootURL: string = 'https://recipe-book-7ec35.firebaseio.com/';

 
    constructor(private http: HttpClient, private recipeService: RecipeService){

    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.rootURL + "recipes.json", recipes).subscribe(response => {
            console.log(response);
        }); 
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>(this.rootURL+"recipes.json")
        .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe['ingredients'] ? recipe.ingredients : []}
                });
              }),
              tap(recipes => {
                console.log(recipes);
                this.recipeService.updateRecipesList(recipes);
              }))
    }

    fetchShoppingList(){

    }
}