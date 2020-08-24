import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';


const routes: Routes = [
  {
    path:'',
    redirectTo: '/home', 
    pathMatch:'full'
  },
  { path: 'home', component: HomeComponent },  
  { path: 'about', component: AboutComponent },  
  { path: 'categories', loadChildren: () => import('./components/categories/category-list/category-list.module').then(m => m.CategoryListModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
