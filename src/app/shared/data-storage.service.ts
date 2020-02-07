import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: "root"})
export class DataStorageService{

    rootURL: string = 'https://recipe-book-7ec35.firebaseio.com/';

 
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){

    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.authService.userSubject.pipe(
            take(1), 
            exhaustMap( user => {
                return this.http.put(this.rootURL + "recipes.json", recipes,
                {
                    params: new HttpParams().set('auth', user.token)
                });
            
            })
        ).subscribe(response => {
            console.log(response);
        }); 
    }

    fetchRecipes(){
        return this.authService.userSubject.pipe(
            
            take(1), 
            exhaustMap(user => {
                return this.http.get<Recipe[]>(this.rootURL+"recipes.json",
                {
                    params: new HttpParams().set('auth', user.token)
                });
            }),
            map(recipes => {
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