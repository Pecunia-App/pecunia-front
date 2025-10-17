import { TagDTO } from './tag.dto';
import { ProviderDTO } from './provider.dto';
import { CategoryDTO } from './category.dto';
import { MoneyDTO } from './money.dto';

export interface TransactionDTO {
  id: number;
  type: 'DEBIT' | 'CREDIT';
  note?: string;
  amount: MoneyDTO;
  tags?: TagDTO[];
  provider?: ProviderDTO;
  category: CategoryDTO;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface TransactionCreateDTO {
  amount: {
    amount: number;
    currency: string; // exemple: "EUR"
  };
  note?: string;
  walletId: number;
  tagsIds?: number[];
  categoryId: number;
  providerId?: number;
}
