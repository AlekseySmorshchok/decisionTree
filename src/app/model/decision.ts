import {  Injectable } from "@angular/core";
import { Alternative } from "./alternative";
import { Deserializable } from "../services/deserializable";

export class Decision  implements Deserializable {

  
  public alternativeArray: Alternative[] = [];
  public id: number;
  public name: string;
  public note: string;
  public stage: number;
  public dateCreate: Date;
  public url: string;
  public urlTable: string;
  
  constructor() {
    this.id = 0;
    this.name = "";
    this.note = "";
    this.stage = 0;
    this.dateCreate = new Date();
    this.alternativeArray = [];
    this.url = "";
    this.urlTable = "";
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

