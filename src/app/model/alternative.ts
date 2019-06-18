import { Injectable } from "@angular/core";
import { Criteria } from './criteria';
import { Deserializable } from "../services/deserializable";

@Injectable()
export class Alternative implements Deserializable {
  public id: number;
  public name: string;
  public url: string;
  public finalRate: number;
  public criteriaArray: Criteria[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.url = '';
    this.finalRate = 1;
    this.criteriaArray = [];
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

  get getUrl()
  {
    return this.url;
  }

  set setUrl(url : string)
  {
    this.url = url;
  }

  get getFinalRate()
  {
    return this.finalRate;
  }

  set setFinalRate(finalRate:number)
  {
    this.finalRate = finalRate;
  }

   get getCriteriaArray()
  {
    return this.criteriaArray;
  }

  set setCriteriaArray(criteriaArray : Criteria[])
  {
    this.criteriaArray = criteriaArray;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
