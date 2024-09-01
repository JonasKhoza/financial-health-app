export interface UserAuthInterface {
  username?: string;
  email?: string;
  password: string;
}

interface ProfileDataInterface {
  _id?: string;
  salutation: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
}

class Profile {
  private salutation: string;
  private firstName: string;
  private lastName: string;
  private username: string;

  constructor(s: string, fn: string, ln: string, un: string) {
    (this.salutation = s),
      (this.firstName = fn),
      (this.lastName = ln),
      (this.username = un);
  }

  //Setters
  public setSalutation(s: string) {
    this.salutation = s;
  }

  public setFirstName(fn: string) {
    this.firstName = fn;
  }

  public setLastName(ln: string) {
    this.lastName = ln;
  }

  public setUsername(un: string) {
    this.username = un;
  }
  //Getters
  public getSalutation() {
    return this.salutation;
  }

  public getFistName() {
    return this.firstName;
  }

  public getLastName() {
    return this.lastName;
  }

  public getUsername() {
    return this.username;
  }
}

export { ProfileDataInterface, Profile };
