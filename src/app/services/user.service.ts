import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersChangedSource = new Subject<void>();  // Emit events when department is added
  usersChanged$ = this.usersChangedSource.asObservable();

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
  addUser(newUser: User): void {
    newUser.userId = this.users.length+1;
    this.users.push(newUser);
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
    const index = this.users.findIndex(user => user.userId === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.usersChangedSource.next(); // Notify subscribers that the user list has changed
    }
  }

  /** Emit events for projects update */
  notifyUsersChanged(): void {
    this.usersChangedSource.next();
  }
}
