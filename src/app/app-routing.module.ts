import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionComponent } from './competition/competition.component';
import { DrinkComponent } from './drink/drink.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'recipes', component: RecipesComponent},
  {path:'drink/:id', component: DrinkComponent},
  {path:'localBars', component: MapComponent},
  {path:'competition', component: CompetitionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
