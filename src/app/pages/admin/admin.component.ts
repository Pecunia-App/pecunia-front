import { Component } from '@angular/core';
import { ConnectedLayoutComponent } from '../../shared/layout/connected-layout/connected-layout.component';

@Component({
  selector: 'app-admin',
  imports: [ConnectedLayoutComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
