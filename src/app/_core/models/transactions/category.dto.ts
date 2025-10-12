type Type = 'DEBIT' | 'CREDIT';

export interface CategoryDTO {
  id: number;
  categoryName: string;
  icon: string;
  color: string;
  type: Type;
  userId: number;
  global: boolean;
}
