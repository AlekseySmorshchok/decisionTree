import { Injectable } from "@angular/core";
import { Deserializable } from "../services/deserializable";

@Injectable()
export class Criteria implements Deserializable{
  public id: number;
  public name: string ;
  public rate: number;
  public value: string;
  public valueRate: number;
  public criterionPriority: number;
  public valuePriority: number;
  public minMaxValue: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.rate = 0;
    this.value = null;
    this.valueRate = null;
    this.criterionPriority = 0;
    this.valuePriority = 0;
    this.minMaxValue = false;
  }


  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
