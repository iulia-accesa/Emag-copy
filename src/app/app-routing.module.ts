import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-engine/searchbar/searchbar.component';


const routes: Routes = [{
  path:'',
  //component:AppComponent 
  component: SearchBarComponent
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
