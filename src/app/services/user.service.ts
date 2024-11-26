import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    new User(1, 'Alice Johnson', 'alice@example.com', 'Manager'),
    new User(2, 'Bob Smith', 'bob@example.com', 'Developer'),
    new User(3, 'Charlie Brown', 'charlie@example.com', 'Tester')
  ];

  constructor() {}

  // Get all users
  getUsers(): User[] {
    return this.users;
  }

  // Get a user by ID
  getUserById(userId: number): User | undefined {
    return this.users.find((user) => user.userId === userId);
  }

  // Add a new user
  addUser(user: User): void {
    this.users.push(user);
  }

  // Update an existing user
  updateUser(updatedUser: User): void {
    const index = this.users.findIndex((user) => user.userId === updatedUser.userId);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  // Delete a user
  deleteUser(userId: number): void {
    this.users = this.users.filter((user) => user.userId !== userId);
  }
}
