import {  Injectable } from "@angular/core";
import { Alternative } from "./alternative";
import { Deserializable } from "../services/deserializable";

export class Decision  implements Deserializable {

  
  public alternativeArray: Alternative[] = [];
  public id: number;
  public name: string;
  public note: string;
  public stage: number;
  
  constructor() {
    this.id = 0;
    this.name = "";
    this.note = "";
    this.stage = 0;
    this.alternativeArray = [];
  }
  
  

  deserialize(input: any): this {
    Object.assign(this, input);
    if(this.name != '') {
      return this;
    }else {
      return null;
    }
  }

}

