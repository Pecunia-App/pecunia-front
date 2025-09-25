import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputComponent } from '../../ui/input/input.component';
import { RadioGroupComponent } from '../../ui/radio-group/radio-group.component';
import { RadioOption } from '../../../_core/models/radio-option.model';

@Component({
  selector: 'app-wallet-form',
  imports: [FormsModule, ButtonComponent, InputComponent, RadioGroupComponent],
  templateUrl: './wallet-form.component.html',
  styleUrl: './wallet-form.component.scss',
})
export class WalletFormComponent {
  newWallet = {
    name: '',
    balance: 0,
    currency: 'EUR',
  };

  currencyOptions: RadioOption<string>[] = [
    { label: 'EUR', value: 'EUR' },
    { label: 'USD', value: 'USD' },
  ];

  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log('Form submitted', this.newWallet);
  }
}
