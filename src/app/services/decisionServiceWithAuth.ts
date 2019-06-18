import { Injectable } from "@angular/core";
import { DecisionInterface } from "./decisionInterface";
import { Decision } from "../model/decision";
import { AuthConfigConsts, AuthHttp } from "angular2-jwt";
import { Http,Headers } from '@angular/http';
import { environment } from "../../environments/environment";

@Injectable()
export class DecisionServiceWithAuth implements DecisionInterface
{
    host : string = environment.host;
    private authHttp: AuthHttp;
    
    getDecision(): Decision {
        return JSON.parse(localStorage.getItem("decision")) as Decision;
    }    
    
    setDecision(decision: Decision) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
        this.authHttp.post(this.host + `saveDecision`, decision,{headers})
        .map(response => response.json() as Decision).subscribe(
            data=>
            {
              localStorage.setItem("idDecision", data.id.toString());
            }
          );
    }


}