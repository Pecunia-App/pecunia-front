import { Component } from '@angular/core';
import { ProfileFormComponent } from '../../shared/forms/profile-form/profile-form.component';

@Component({
  selector: 'app-profile',
  imports: [ProfileFormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
