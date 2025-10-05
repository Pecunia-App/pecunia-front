import { CurrencyDTO } from './currency.dto';

export interface MoneyDTO {
  amount: number;
  currency: CurrencyDTO;
  currencySymbol: string;
  currencyCode: string;
}
