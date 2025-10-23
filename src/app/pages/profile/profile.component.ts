import { Component } from '@angular/core';
import { ProfileFormComponent } from '../../shared/forms/profile-form/profile-form.component';
import { ConnectedLayoutComponent } from '../../shared/layout/connected-layout/connected-layout.component';

@Component({
  selector: 'app-profile',
  imports: [ProfileFormComponent, ConnectedLayoutComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
