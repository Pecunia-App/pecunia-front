import { Component } from '@angular/core';
import { ConnectedLayoutComponent } from '../../shared/layout/connected-layout/connected-layout.component';

@Component({
  selector: 'app-transactions',
  imports: [ConnectedLayoutComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {}
