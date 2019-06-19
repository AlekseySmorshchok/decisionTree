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

  get getId()
  {
    return this.id;
  }

  set setId(id : number)
  {
    this.id = id;
  }
  get getName()
  {
    return this.name;
  }

  set setName(name : string)
  {
    this.name = name;
  }
  get getRate()
  {
    return this.rate;
  }

  set setRate(rate : number)
  {
    this.rate = rate;
  }
  get getValue()
  {
    return this.value;
  }

  set setValue(value : string)
  {
    this.value =value;
  }
  get getValueRate()
  {
    return this.valueRate;
  }

  set setValueRate(valueRate : number)
  {
    this.valueRate = valueRate;
  }
  get getCriterionPriority()
  {
    return this.criterionPriority;
  }

  set setCriterionPriority(criterionPriority : number)
  {
    this.criterionPriority = criterionPriority;
  }
  get getValuePriority()
  {
    return this.valuePriority;
  }

  set setValuePriority(valuePriority : number)
  {
    this.valuePriority = valuePriority;
  }

  get getMinMaxValue()
  {
    return this.minMaxValue;
  }

  set setMinMaxValue(minMaxValue : boolean)
  {
    this.minMaxValue = minMaxValue;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
