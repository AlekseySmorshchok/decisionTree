import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpXsrfTokenExtractor } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './decision/home/home.component';
import { DecisionModule } from './decision/decision-module/decision.module';
import { CreateTreeComponent } from './decision/create-tree/create-tree.component';
import { FormsModule } from '@angular/forms';
import { DecisionCreateService } from './services/decision-create.service';
import { CreateCriteriaComponent } from './decision/create-criteria/create-criteria.component';
import { CreateAlternativeComponent } from './decision/create-alternative/create-alternative.component';
import { RedirectWithMessageComponent } from './decision/create-alternative/redirect-with-message/redirect-with-message.component';
import { EditAlternativeComponent } from './decision/create-alternative/edit-alternative/edit-alternative.component';
import { DeletAlternativeComponent } from './decision/create-alternative/delet-alternative/delet-alternative.component';
import { EditCriteriaComponent } from './decision/create-criteria/edit-criteria/edit-criteria.component';
import { DeleteCriteriaComponent } from './decision/create-criteria/delete-criteria/delete-criteria.component';
import { FillValueCriteriaComponent } from './decision/fill-value-criteria/fill-value-criteria.component';
import { InstructionComponent } from './decision/instruction/instruction.component';
import { PairedComparisonCriteriaComponent } from './decision/paired-comparison-criteria/paired-comparison-criteria.component';
import { AuthHttp, AuthConfig, provideAuth, AuthConfigConsts } from 'angular2-jwt';
import { PairedComparisonCriteriaValueComponent } from './decision/paired-comparison-criteria-value/paired-comparison-criteria-value.component';
import { EndTreeComponent } from './decision/end-tree/end-tree.component';
import { HeaderComponent } from './decision/header/header.component';
import { UserComponent } from './decision/header/user/user.component';
import { SignUpComponent } from './decision/header/user/sign-up/sign-up.component';
import { SignInComponent } from './decision/header/user/sign-in/sign-in.component';
import { UserService } from './services/user-service';
import { ValidationData } from './services/validationData';
import { FooterComponent } from './decision/footer/footer.component';
import { DecisionInterfaceWithauthService } from './services/decision-interface-withauth.service';
import { DecisionInterfaceWithoutauthService } from './services/decision-interface-withoutauth.service';
import { IsNewTreeComponent } from './decision/create-tree/is-new-tree/is-new-tree.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateTreeComponent,
    CreateCriteriaComponent,
    CreateAlternativeComponent,
    RedirectWithMessageComponent,
    EditAlternativeComponent,
    DeletAlternativeComponent,
    EditCriteriaComponent,
    DeleteCriteriaComponent,
    FillValueCriteriaComponent,
    InstructionComponent,
    PairedComparisonCriteriaComponent,
    PairedComparisonCriteriaValueComponent,
    EndTreeComponent,
    HeaderComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    FooterComponent,
    IsNewTreeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    DecisionModule,
    HttpModule,
  ],
  providers: [DecisionCreateService, UserService, ValidationData,DecisionInterfaceWithauthService,DecisionInterfaceWithoutauthService, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  },],
  bootstrap: [AppComponent]
})


export class AppModule {
  static HTTP: Http; 

  constructor(private http: Http)
  {
    AppModule.HTTP = http;
  }

}

export function authHttpServiceFactory(http: Http, options?: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}