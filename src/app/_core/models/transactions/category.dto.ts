export interface CategoryDTO {
  id: number;
  categoryName: string;
  icon: string;
  color: string; // ex: "#C1D"
  type: 'DEBIT' | 'CREDIT';
  userId: number;
  global: boolean;
}
