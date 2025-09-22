import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputComponent } from '../../ui/input/input.component';

@Component({
  selector: 'app-wallet-form',
  imports: [FormsModule, ButtonComponent, InputComponent],
  templateUrl: './wallet-form.component.html',
  styleUrl: './wallet-form.component.scss',
})
export class WalletFormComponent {
  newWallet = {
    name: '',
    balance: 0,
    currency: '',
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log('Form submitted', this.newWallet);
  }
}
