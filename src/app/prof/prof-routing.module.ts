import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfComponent } from './prof.component';

const routes: Routes = [{ path: '', component: ProfComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfRoutingModule { }
