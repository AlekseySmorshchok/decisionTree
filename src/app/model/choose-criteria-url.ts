export class ChooseCriteriaUrl {

    public choose: boolean;
    public criteriaName: string;
    
    constructor() {
      this.choose = false;
      this.criteriaName = '';
    }
  
    deserialize(input: any): this {
      Object.assign(this, input);
      return this;
    }
}
