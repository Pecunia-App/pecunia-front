import { MoneyDTO } from './money.dto';

export interface WalletDTO {
  id: number;
  name: string;
  amount: MoneyDTO;
}
