import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../_core/services/user/user.service';
import { WalletService } from '../../../_core/services/wallet/wallet.service';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputComponent } from '../../ui/input/input.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrl: './wallet-form.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent],
})
export class WalletFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private walletService = inject(WalletService);

  walletForm!: FormGroup;
  userId!: number;

  ngOnInit() {
    this.walletForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      balance: [0, [Validators.required, Validators.min(0)]],
      currency: ['EUR', Validators.required],
    });

    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.userId = user.id!;
        console.log('Utilisateur connecté :', user);
      },
      error: (err) => console.error('Erreur récupération user', err),
    });
  }

  onSubmit() {
    if (!this.userId) {
      console.error('User ID not found');
      return;
    }

    if (this.walletForm.invalid) {
      this.walletForm.markAllAsTouched();
      return;
    }

    const { name, balance, currency } = this.walletForm.value;

    const walletData = {
      name,
      amount: {
        amount: Number(balance),
        currency,
      },
      userId: this.userId,
    };

    console.log('walletData envoyé:', walletData);
    this.walletService.createWallet(walletData).subscribe({
      next: (wallet) => {
        console.log('Wallet created successfully', wallet);
        this.router.navigate(['/transactions']);
      },
      error: (err) => {
        console.error('Error creating wallet', err);
        this.router.navigate(['/first-login']);
      },
    });
  }
}
