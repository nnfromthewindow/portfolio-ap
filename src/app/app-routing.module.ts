import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [   {path: ':username', component:AppComponent},
                            {path: 'nuccelli', component:AppComponent},
                            {path:':username/**', redirectTo:'/nuccelli', pathMatch:'prefix'},
                            { path: '**', redirectTo: '/nuccelli', pathMatch:'full' },

                           ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
