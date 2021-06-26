import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalyseSentimentsComponent, NgbdModalContent } from './components/analyse-sentiments/analyse-sentiments.component';
import { FakeTrueNewsComponent, NgbdModalContentNews } from './components/fake-true-news/fake-true-news.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AnalyseSentimentsComponent,
    FakeTrueNewsComponent,
    NgbdModalContent,
    NgbdModalContentNews
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[NgbdModalContent,
    NgbdModalContentNews
  ]
})
export class AppModule { }
