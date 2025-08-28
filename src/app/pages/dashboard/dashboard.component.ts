import { Component } from '@angular/core';
import { ConnectedLayoutComponent } from '../../shared/layout/connected-layout/connected-layout.component';

@Component({
  selector: 'app-dashboard',
  imports: [ConnectedLayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
