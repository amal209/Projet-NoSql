import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AnalyseSentimentsComponent } from './components/analyse-sentiments/analyse-sentiments.component';
import { FakeTrueNewsComponent } from './components/fake-true-news/fake-true-news.component';


const routes: Routes = [
  {path:'home',component:AnalyseSentimentsComponent},
   {path:'',component:AnalyseSentimentsComponent},
  {path:'sentiments',component:AnalyseSentimentsComponent},
  {path:'news',component:FakeTrueNewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
