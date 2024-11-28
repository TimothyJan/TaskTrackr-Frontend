import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {
  user: User = new User(0, "", "", "");

  nameInvalid: boolean = false;
  emailInvalid: boolean = false;
  roleInvalid: boolean = false;

   // Regular expression to validate XXX@XXX.com format
   private emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private activeModal: NgbActiveModal,
    private _userService: UserService
  ) {}

  /** Validation for name and email */
  validateFields(): void {
    this.nameInvalid = !this.user.name.trim();
    this.emailInvalid = !this.emailRegex.test(this.user.email.trim()); // Validate email format
    this.roleInvalid = !this.user.role.trim();
  }

  // Clear the form
  clearForm(): void {
    this.user = new User(0, "", "", "");
  }

  /** Add User */
  addUser(): void {
    this.validateFields();

    if (this.nameInvalid || this.emailInvalid || this.roleInvalid) {
      return; // Prevent saving if there are validation errors
    }

    this._userService.addUser(this.user);

    this.clearForm();
    this.closeModal();
  }

  /** Edit User */
  updateUser(): void {
    this.validateFields();

    if (this.nameInvalid || this.emailInvalid || this.roleInvalid) {
      return; // Prevent saving if there are validation errors
    }

    this._userService.updateUser(this.user);

    this.clearForm();
    this.closeModal();
  }

  /** Close the Modal */
  closeModal(): void {
    this.activeModal.close(); // Pass result back to parent
  }
}
