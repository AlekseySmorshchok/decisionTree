import { Injectable } from "@angular/core";

@Injectable()
export class Criteria {
  public id: number;
  public name: string = '';
  public rate: number = 0;
  public value: string = null;
  public valueRate: number = null;
  public criterionPriority: number = 0;
  public valuePriority: number = 0;
  public minMaxValue: boolean = false;

  constructor() {}

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

}
