export class User {
  userId: number;
  name: string;
  email: string;
  role: string;

  constructor(
    userId: number,
    name: string,
    email: string,
    role: string
  ) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
