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

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
