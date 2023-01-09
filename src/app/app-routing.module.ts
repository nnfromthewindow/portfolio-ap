import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutmeTextModalComponent } from './shared/components/aboutme-text-modal/aboutme-text-modal.component';
import { EducationEditModalComponent } from './shared/components/education-edit-modal/education-edit-modal.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { UserDetailsComponent } from './shared/components/user-details/user-details.component';



const routes: Routes = [   {path: ':username', component:AppComponent},
                            {path: 'nuccelli', component:AppComponent},
                            {path: ':username/aboutme/:id', component:AboutmeTextModalComponent},
                            {path: ':username/education/:id', component:EducationEditModalComponent},
                            { path: '**', redirectTo: 'nuccelli', pathMatch:'full' },

                           ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
