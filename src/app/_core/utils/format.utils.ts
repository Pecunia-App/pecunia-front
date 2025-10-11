import { MoneyDTO } from '../models/transactions/money.dto';
import { TransactionDTO } from '../models/transactions/transaction.dto';

/**
 * Formatte une date ISO en format français lisible
 */
export function formatDateFr(dateStr?: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Formatte un solde en euros avec signe et séparateurs
 */
export function TotalAmountFr(amount?: MoneyDTO): string {
  if (!amount) return '';
  const absValue = Math.abs(amount.amount);
  const formatted = absValue.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
  });
  const sign = amount.amount >= 0 ? '+' : '-';
  return `${sign} ${formatted} ${amount.currency}`;
}

/**
 * Formatte un montant d'une transaction
 */
export function formattedAmountTransaction(
  transaction: TransactionDTO
): string {
  const absValue = Math.abs(transaction.amount.amount);
  const formatted = absValue.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
  });
  return `${formatted} ${transaction.amount.currency}`;
}
