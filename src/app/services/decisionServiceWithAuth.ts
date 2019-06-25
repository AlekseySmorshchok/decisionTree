import { Injectable, Inject } from "@angular/core";
import { DecisionInterface } from "./decisionInterface";
import { Decision } from "../model/decision";
import { AuthConfigConsts, AuthHttp, AuthConfig } from "angular2-jwt";
import { Http,Headers } from '@angular/http';
import { environment } from "../../environments/environment";
import { Alternative } from "../model/alternative";
import { Criteria } from "../model/criteria";
import { AppModule } from "../app.module";

@Injectable()
export class DecisionServiceWithAuth implements DecisionInterface
{

    host = environment.host;
    authHttp: AuthHttp;
    @Inject(Http) Http: Http;
    constructor() {
      // tslint:disable-next-line:no-unused-expression
      this.authHttp = new AuthHttp(new AuthConfig() , AppModule.HTTP);
    }


      async getDecision() {
        let decision: Decision = null;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      var id  = +localStorage.getItem("idDecision");
      if(id != 0)
      {
         this.authHttp.post(this.host + `getDecision`, id, {headers}) .map(response => response.json() as Decision).subscribe(data=>
          {

            decision  =  new Decision().deserialize(data);
          });
      }
      return await decision;
    }

    setDecision(decision: Decision) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
        this.authHttp.post(this.host + `saveOrUpdateDecision`, decision,{headers})
        .map(response => response.json() as number).subscribe(
          data=>
          {
            localStorage.setItem("idDecision",data.toString());
          }
        );
    }
    
    addAlternative(name: string, flag: boolean): Decision {
      throw new Error("Method not implemented.");
    }
    editAlternative(alternative: Alternative): Decision {
      throw new Error("Method not implemented.");
    }
    deliteAlternative(alternative: Alternative): Decision {
      throw new Error("Method not implemented.");
    }
    addCriteria(name: string): Decision {
      throw new Error("Method not implemented.");
    }
    editCriteria(criteria: Criteria, result: string): Decision {
      throw new Error("Method not implemented.");
    }
    deleteCriteria(criteria: Criteria): Decision {
      throw new Error("Method not implemented.");
    }

 }