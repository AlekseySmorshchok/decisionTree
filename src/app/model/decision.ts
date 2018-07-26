export class Decision {
  private id: number;
  private name: string;
  private note: string;
  private stage: number = 0;
  private alternativeArray: Alternative[] = [];
  constructor(){}
  
  get getId():number{
    return this.id
  }

  set setId(id:number)
  {
    this.id = id;
  }

  get getName() : string{
    return this.name
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

  set setAlternative(decisionArray:Alternative[])
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

}

export class Alternative {
  private id: number;
  private name: string;
  private url: string = null;
  private finalRate: number = 1;
  private criteriaArray: Criteria[] = [];

  constructor() {
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
}

export class Criteria {
  private id: number;
  private name: string = '';
  private rate: number = 0;
  private value: string = null;
  private valueRate: number = null;
  private criterionPriority: number = 0;
  private valuePriority: number = 0;
  private minMaxValue: boolean = false;

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
