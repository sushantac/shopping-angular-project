import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;

  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;

      this.initForm();
    });
  }

  initForm(){
    
    let recipe: Recipe = null;
    let ingredients = new FormArray([]);

    if(this.editMode){
      recipe = this.recipeService.getRecipe(this.id);
     

      if(recipe['ingredients'] != null){
        for(let ingredient of recipe.ingredients){
          ingredients.push(
            new FormGroup({
              "name": new FormControl(ingredient.name, Validators.required),
              "amount": new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl( (recipe!==null) ? recipe.name : "", Validators.required),
      "description": new FormControl( (recipe!==null) ? recipe.description : ""),
      "imagePath": new FormControl( (recipe!==null) ? recipe.imagePath : "", Validators.required),
      "ingredients": ingredients
    }, null, null);
  
  }

  onSubmit(){
    console.log(this.recipeForm.value);

    if(this.editMode){
      this.recipeService.updateRecipe(this.recipeForm.value, this.id);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    
    this.onCancel();
  }

  onAddIngredient(){
    console.log("Here...");

    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        "name": new FormControl(),
        "amount": new FormControl()
      })
    );
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route });
  }

  onDelete(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
