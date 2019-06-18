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
    this.name = '';
    this.note = '';
    this.stage = 0;
    this.alternativeArray = [];
  }
  
  get getId(): number{
    return this.id
  }

  set setId(id:number)
  {
    this.id = id;
  }

  get getName(): string{
    return this.name;
  }

  set setName(name : string)
  {
    this.name = name;
  }

  get getNote():string{
    return this.note
  }

  set setNote(note:string)
  {
    this.note = note;
  }

  get getAlternative():Alternative[]{
    return this.alternativeArray
  }

  set setAlternative(decisionArray: Alternative[])
  {
    this.alternativeArray = decisionArray;
  }

  get getStage()
  {
    return this.stage;
  }

  set setStage(stage : number)
  {
    this.stage = stage;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    console.log("asd");
    console.log(this);
    if(this.getName != '') {
      this.alternativeArray = []
      let alternative = new Alternative().deserialize(input.alternative);
      if(alternative.getName !='')
      {
        this.alternativeArray.push(new Alternative().deserialize(input.alternative));
      }
      return this;
    }else {
      return null;
    }
  }

}

