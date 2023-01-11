import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutmeTextModalComponent } from './shared/components/aboutme-text-modal/aboutme-text-modal.component';
import { EducationEditModalComponent } from './shared/components/education-edit-modal/education-edit-modal.component';
import { ExperienceEditModalComponent } from './shared/components/experience-edit-modal/experience-edit-modal.component';
import { ProjectEditModalComponent } from './shared/components/project-edit-modal/project-edit-modal.component';
import { SkillEditModalComponent } from './shared/components/skill-edit-modal/skill-edit-modal.component';




const routes: Routes = [   {path: ':username', component:AppComponent},
                            {path: 'nuccelli', component:AppComponent},
                            {path: ':username/aboutme/:id', component:AboutmeTextModalComponent},
                            {path: ':username/education/:id', component:EducationEditModalComponent},
                            {path: ':username/experience/:id', component:ExperienceEditModalComponent},
                            {path: ':username/skill/:id', component:SkillEditModalComponent},
                            {path: ':username/project/:id', component:ProjectEditModalComponent},
                            { path: '**', redirectTo: 'nuccelli', pathMatch:'full' },

                           ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
