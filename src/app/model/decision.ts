export class Decision {
  public id: number;
  public name: string;
  public note: string;
  public stage: number = 0;
  public alternativeArray: Alternative[] = [];
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
  public id: number;
  public name: string;
  public url: string = null;
  public finalRate: number = 1;
  public criteriaArray: Criteria[] = [];

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
