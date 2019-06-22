import { Injectable, Inject } from "@angular/core";
import { DecisionInterface } from "./decisionInterface";
import { Decision } from "../model/decision";
import { AuthConfigConsts, AuthHttp, AuthConfig } from "angular2-jwt";
import { Http,Headers, ConnectionBackend } from '@angular/http';
import { environment } from "../../environments/environment";
import { Alternative } from "../model/alternative";
import { Criteria } from "../model/criteria";
import { authHttpServiceFactory } from "../app.module";

@Injectable()
export class DecisionServiceWithAuth implements DecisionInterface
{

    host = environment.host;
    authHtpp: AuthHttp;
    


    getDecision() {
      this.authHtpp = AuthHttp.prototype;
      console.log(this.authHtpp);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      var id : number = +localStorage.getItem("idDecision");
      console.log(this.authHtpp.post(this.host + `getDecision`, id, {headers})
      .map(response => response.json() as Decision));
      
    }

    setDecision(decision: Decision) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      return AuthHttp.prototype.post(this.host + `saveDecision`, decision,{headers})
      .map(response => response.json() as string);
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