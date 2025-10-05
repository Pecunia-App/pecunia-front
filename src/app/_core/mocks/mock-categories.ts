import { CategoryDTO } from '../models/transactions/category.dto';

export const MOCK_CATEGORIES: CategoryDTO[] = [
  {
    id: 1,
    categoryName: 'Courses',
    icon: 'shopping-cart',
    color: 'background-badge-green-low',
    type: 'DEBIT',
    userId: 1,
    global: true,
  },
  {
    id: 2,
    categoryName: 'Logement',
    icon: 'house',
    color: 'background-badge-blue-low',
    type: 'DEBIT',
    userId: 1,
    global: true,
  },
  {
    id: 3,
    categoryName: 'Salaire',
    icon: 'banknote',
    color: 'background-badge-yellow-low',
    type: 'CREDIT',
    userId: 1,
    global: true,
  },
  {
    id: 4,
    categoryName: 'Loisirs',
    icon: 'gamepad-2',
    color: 'background-badge-pink-low',
    type: 'DEBIT',
    userId: 1,
    global: true,
  },
  {
    id: 5,
    categoryName: 'Transport',
    icon: 'bus',
    color: 'background-badge-red-low',
    type: 'DEBIT',
    userId: 1,
    global: true,
  },
];
