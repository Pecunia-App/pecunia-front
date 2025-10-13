export interface CategoryDTO {
  id: number;
  categoryName: string;
  icon: string;
  color: string;
  type: 'DEBIT' | 'CREDIT';
  userId: number;
  global: boolean;
}
