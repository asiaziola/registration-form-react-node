export class UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: Date;

  constructor(data: User) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.eventDate = data.eventDate;
  }
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: Date;
}
