import { Component, computed, inject, Input } from '@angular/core';
import { TransactionDTO } from '../../../_core/models/transactions/transaction.dto';
import { NgClass } from '@angular/common';
import { BadgeComponent } from '../../ui/badge/badge.component';
import { BreakpointService } from '../../../_core/services/responsive/breakpoint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-card',
  imports: [NgClass, BadgeComponent],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.scss',
})
export class TransactionCardComponent {
  @Input({ required: true }) transaction!: TransactionDTO;
  private readonly breakpoint = inject(BreakpointService);
  private readonly router = inject(Router);
  readonly isDesktop = computed(() => this.breakpoint.isDesktop);

  isDebit(): boolean {
    return this.transaction.type === 'DEBIT';
  }

  isCredit(): boolean {
    return this.transaction.type === 'CREDIT';
  }

  formattedAmount(): string {
    const absValue = Math.abs(this.transaction.amount.amount);
    const formatted = absValue.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
    });
    return `${formatted} ${this.transaction.amount.currencyCode}`;
  }

  hasProvider(): boolean {
    return !!this.transaction.provider?.providerName;
  }

  goToTransaction(): void {
    this.router.navigate(['/transactions/update', this.transaction.id]);
  }
}
