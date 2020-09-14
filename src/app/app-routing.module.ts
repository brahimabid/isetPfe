import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfGuard } from './service/prof.guard';
import { ResponsableGuard } from './service/responsable.guard';
import { AgentGuard } from './service/agent.guard';


const routes: Routes = [
  { path: 'agent',
  canActivate:[AgentGuard]
  , loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule) },
   { path: 'responsable',
   canActivate:[ResponsableGuard]
   , loadChildren: () => import('./responsable/responsable.module').then(m => m.ResponsableModule) },
    { path: 'prof',canActivate:[ProfGuard],
     loadChildren: () => import('./prof/prof.module').then(m => m.ProfModule) },
  {path:'auth/login',component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
