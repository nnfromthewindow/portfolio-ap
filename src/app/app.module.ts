import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModuleModule } from '../app/angular-material-module.module';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { BannerModule } from './shared/components/banner/banner.module';
import { AboutmeModule } from './shared/components/aboutme/aboutme.module';
import { FormationModule } from './shared/components/formation/formation.module';
import { SkillsModule } from './shared/components/skills/skills.module';
import { ProjectsModule } from './shared/components/projects/projects.module';
import { EducationModule } from './shared/components/education/education.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModuleModule,
    NavbarModule,
    BannerModule,
    AboutmeModule,
    FormationModule,
    SkillsModule,
    ProjectsModule,
    EducationModule
  ],
  providers: [],
  exports: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
