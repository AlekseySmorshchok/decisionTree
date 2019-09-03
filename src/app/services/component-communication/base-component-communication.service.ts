import {Subject} from 'rxjs';

export class BaseComponentCommunicationService<T> {
  protected  storedData: T;
  protected dataTransferSource = new Subject<T>();
  public  dataTransferEvent$ = this.dataTransferSource.asObservable();

  constructor() { }

  public sendData(): void {
    this.dataTransferSource.next(this.storedData);
  }

  public setData(data: T): void {
    this.storedData = data;
  }

  public getData(): T {
    return this.storedData;
  }
}
