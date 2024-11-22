import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  users: User[] = [];
  newUser: User = { userId: 0, name: '', email: '', role: '' };

  constructor(
    private _userService: UserService
  ) {}

  getUsers(): void {
    this.users = this._userService.getUsers();
  }

  addUser() {
    this.newUser.userId = Date.now();
    this.users.push({ ...this.newUser });
    this.newUser = { userId: 0, name: '', email: '', role: '' };
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(u => u.userId !== userId);
  }
}
