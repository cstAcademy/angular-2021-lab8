import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElementsTableComponent } from './elements-table/elements-table.component';


const routes: Routes = [{path: '', component: ElementsTableComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
