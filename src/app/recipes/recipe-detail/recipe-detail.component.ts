import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe:Recipe;
  id: number;

  constructor(private receipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { 

  }

  ngOnInit() {
    //const id = this.route.snapshot.params['id'];
    this.route.params.subscribe((paramas: Params) =>
    {
      this.id = +paramas['id'];
      this.recipe = this.receipeService.getRecipe(this.id);
    });
  }


  onAddToShoppingList(){
    this.receipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onRecipeDelete(){
    this.receipeService.deleteRecipe(this.id);

    this.router.navigate(['../'], {relativeTo: this.route});
  }
  

}
