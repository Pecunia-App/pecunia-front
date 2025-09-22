import { Component } from '@angular/core';
import { PublicLayoutComponent } from '../../shared/layout/public-layout/public-layout.component';
import { WalletFormComponent } from '../../shared/forms/wallet-form/wallet-form.component';

@Component({
  selector: 'app-first-login',
  imports: [PublicLayoutComponent, WalletFormComponent],
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss'],
})
export class FirstLoginComponent {}
