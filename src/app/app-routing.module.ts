import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { UserDetailsComponent } from './shared/components/user-details/user-details.component';



const routes: Routes = [   {path: ':username', component:AppComponent},
                            {path:'', redirectTo: '/argentina', pathMatch:'full'} 
                           ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
