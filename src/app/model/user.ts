import { Injectable } from '@angular/core';

@Injectable()
export class User {
 // private id: number;
  private firstName: string;
  private lastName: string;
  private userName: string;
  private password: string;
  private email: string;
  //private role: string;
  constructor(){}

  /*get _id(): number {
    return this.id;
  }

  set _id(value: number) {
    this.id = value;
  }*/
  
  get _userName(): string {
    return this.userName;
  }

  set _userName(value: string) {
    this.userName = value;
  }

  get _password(): string {
    return this.password;
  }

  set _password(value: string) {
    this.password = value;
  }

  get _firstName(): string {
    return this.firstName;
  }

  set _firstName(value: string) {
    this.firstName = value;
  }

  get _lastName(): string {
    return this.lastName;
  }

  set _lastName(value: string) {
    this.lastName = value;
  }

  get _email(): string {
    return this.email;
  }

  set _email(value: string) {
    this.email = value;
  }

  /*get _image(): string {
    return this.image;
  }

  set _image(value: string) {
    this.image = value;
  }*/

  /*get _role(): string {
    return this.role;
  }

  set _role(value: string) {
    this.role = value;
  }*/
}