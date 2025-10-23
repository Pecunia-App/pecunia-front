import { IconName } from '../../../shared/ui/icon/icon.model';

export type CategoryType = 'DEBIT' | 'CREDIT';

export interface BadgeColor {
  value: string;
  label: string;
  cssClass: string;
}

export const BADGE_COLORS: BadgeColor[] = [
  {
    value: 'background-badge-blue-low',
    label: 'Bleu clair',
    cssClass: 'background-badge-blue-low',
  },
  {
    value: 'background-badge-blue-medium',
    label: 'Bleu moyen',
    cssClass: 'background-badge-blue-medium',
  },
  {
    value: 'background-badge-green-low',
    label: 'Vert clair',
    cssClass: 'background-badge-green-low',
  },
  {
    value: 'background-badge-green-medium',
    label: 'Vert moyen',
    cssClass: 'background-badge-green-medium',
  },
  {
    value: 'background-badge-grey',
    label: 'Gris',
    cssClass: 'background-badge-grey',
  },
  {
    value: 'background-badge-orange-low',
    label: 'Orange clair',
    cssClass: 'background-badge-orange-low',
  },
  {
    value: 'background-badge-orange-medium',
    label: 'Orange moyen',
    cssClass: 'background-badge-orange-medium',
  },
  {
    value: 'background-badge-pink-low',
    label: 'Rose clair',
    cssClass: 'background-badge-pink-low',
  },
  {
    value: 'background-badge-pink-medium',
    label: 'Rose moyen',
    cssClass: 'background-badge-pink-medium',
  },
  {
    value: 'background-badge-red-low',
    label: 'Rouge clair',
    cssClass: 'background-badge-red-low',
  },
  {
    value: 'background-badge-red-medium',
    label: 'Rouge moyen',
    cssClass: 'background-badge-red-medium',
  },
  {
    value: 'background-badge-violet-low',
    label: 'Violet clair',
    cssClass: 'background-badge-violet-low',
  },
  {
    value: 'background-badge-violet-medium',
    label: 'Violet moyen',
    cssClass: 'background-badge-violet-medium',
  },
  {
    value: 'background-badge-yellow-low',
    label: 'Jaune clair',
    cssClass: 'background-badge-yellow-low',
  },
  {
    value: 'background-badge-yellow-medium',
    label: 'Jaune moyen',
    cssClass: 'background-badge-yellow-medium',
  },
];
export type BadgeColorValue =
  | 'background-badge-blue-low'
  | 'background-badge-blue-medium'
  | 'background-badge-green-low'
  | 'background-badge-green-medium'
  | 'background-badge-grey'
  | 'background-badge-orange-low'
  | 'background-badge-orange-medium'
  | 'background-badge-pink-low'
  | 'background-badge-pink-medium'
  | 'background-badge-red-low'
  | 'background-badge-red-medium'
  | 'background-badge-violet-low'
  | 'background-badge-violet-medium'
  | 'background-badge-yellow-low'
  | 'background-badge-yellow-medium';

export interface CategoryDTO {
  id: number;
  categoryName: string;
  icon: string;
  color: BadgeColorValue;
  type: CategoryType;
  userId: number;
  global: boolean;
}

export interface CategoryUpsertDTO {
  categoryName: string;
  icon: IconName;
  color: BadgeColorValue;
  isGlobal: boolean;
  type: CategoryType;
  userId: number;
}
