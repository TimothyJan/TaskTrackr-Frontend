import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    { userId: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Manager' },
    { userId: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Developer' },
    { userId: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Tester' },
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
