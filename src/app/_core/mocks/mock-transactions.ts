import { TransactionDTO } from '../models/transactions/transaction.dto';
import { MoneyDTO } from '../models/transactions/money.dto';
import { MOCK_CATEGORIES } from './mock-categories';
import { MOCK_PROVIDERS } from './mock-providers';
import { MOCK_TAGS } from './mock-tags';

const EUR = (amount: number): MoneyDTO => ({
  amount,
  currency: 'EUR',
  currencySymbol: '€',
  currencyCode: 'EUR',
});

export const MOCK_TRANSACTIONS_CREATED: TransactionDTO[] = [];
export const MOCK_TRANSACTIONS_UPDATED: TransactionDTO[] = [];

const MOCK_TRANSACTIONS_BASE: TransactionDTO[] = [
  {
    id: 1,
    type: 'DEBIT',
    note: 'Courses hebdomadaires',
    amount: EUR(120.5),
    tags: [MOCK_TAGS[0], MOCK_TAGS[1], MOCK_TAGS[2], MOCK_TAGS[4]],
    provider: MOCK_PROVIDERS[2], // Carrefour
    category: MOCK_CATEGORIES[0], // Courses
    createdAt: '2025-09-10T12:32:31.624Z',
    updatedAt: '2025-09-10T12:32:31.624Z',
  },
  {
    id: 2,
    type: 'CREDIT',
    note: 'Salaire mensuel',
    amount: EUR(3200),
    tags: [],
    provider: undefined,
    category: MOCK_CATEGORIES[2], // Salaire
    createdAt: '2025-09-10T08:00:00.000Z',
    updatedAt: '2025-09-10T08:00:00.000Z',
  },
  {
    id: 3,
    type: 'DEBIT',
    note: 'Facture électricité',
    amount: EUR(85),
    tags: [MOCK_TAGS[1]],
    provider: MOCK_PROVIDERS[1], // EDF
    category: MOCK_CATEGORIES[1], // Logement
    createdAt: '2025-08-05T09:10:15.000Z',
    updatedAt: '2025-08-05T09:10:15.000Z',
  },
  {
    id: 4,
    type: 'DEBIT',
    note: 'Abonnement Spotify',
    amount: EUR(9.99),
    tags: [MOCK_TAGS[3]],
    provider: MOCK_PROVIDERS[3], // Spotify
    category: MOCK_CATEGORIES[3], // Loisirs
    createdAt: '2025-07-15T20:00:00.000Z',
    updatedAt: '2025-07-15T20:00:00.000Z',
  },
  {
    id: 5,
    type: 'DEBIT',
    note: 'Billet de train',
    amount: EUR(60),
    tags: [],
    provider: MOCK_PROVIDERS[4], // SNCF
    category: MOCK_CATEGORIES[4], // Transport
    createdAt: '2025-07-15T10:00:00.000Z',
    updatedAt: '2025-07-15T10:00:00.000Z',
  },
  {
    id: 6,
    type: 'CREDIT',
    note: 'Prime exceptionnelle',
    amount: EUR(500),
    tags: [],
    provider: undefined,
    category: MOCK_CATEGORIES[2],
    createdAt: '2025-06-25T14:00:00.000Z',
    updatedAt: '2025-06-25T14:00:00.000Z',
  },
  {
    id: 7,
    type: 'DEBIT',
    note: 'RDV médecin',
    amount: EUR(30),
    tags: [],
    provider: MOCK_PROVIDERS[5], // Doctolib
    category: MOCK_CATEGORIES[1],
    createdAt: '2025-06-12T09:00:00.000Z',
    updatedAt: '2025-06-12T09:00:00.000Z',
  },
  {
    id: 8,
    type: 'DEBIT',
    note: 'Sortie cinéma',
    amount: EUR(25),
    tags: [MOCK_TAGS[4], MOCK_TAGS[3]],
    provider: undefined,
    category: MOCK_CATEGORIES[3],
    createdAt: '2025-05-18T21:00:00.000Z',
    updatedAt: '2025-05-18T21:00:00.000Z',
  },
  {
    id: 9,
    type: 'DEBIT',
    note: 'Taxi',
    amount: EUR(40),
    tags: [MOCK_TAGS[1]],
    provider: undefined,
    category: MOCK_CATEGORIES[4],
    createdAt: '2025-05-18T11:45:00.000Z',
    updatedAt: '2025-05-18T11:45:00.000Z',
  },
  {
    id: 10,
    type: 'DEBIT',
    note: 'Essence',
    amount: EUR(70),
    tags: [MOCK_TAGS[2], MOCK_TAGS[1]],
    provider: undefined,
    category: MOCK_CATEGORIES[4],
    createdAt: '2025-04-18T08:00:00.000Z',
    updatedAt: '2025-04-18T08:00:00.000Z',
  },
  {
    id: 11,
    type: 'DEBIT',
    note: 'Courses week-end',
    amount: EUR(90.2),
    tags: [],
    provider: MOCK_PROVIDERS[2], // Carrefour
    category: MOCK_CATEGORIES[0],
    createdAt: '2025-04-20T12:30:00.000Z',
    updatedAt: '2025-04-20T12:30:00.000Z',
  },
  {
    id: 12,
    type: 'DEBIT',
    note: 'Restaurant',
    amount: EUR(45.5),
    tags: [MOCK_TAGS[0]],
    provider: undefined,
    category: MOCK_CATEGORIES[3],
    createdAt: '2025-03-28T19:45:00.000Z',
    updatedAt: '2025-03-28T19:45:00.000Z',
  },
  {
    id: 13,
    type: 'CREDIT',
    note: 'Remboursement assurance',
    amount: EUR(120),
    tags: [],
    provider: undefined,
    category: MOCK_CATEGORIES[2],
    createdAt: '2025-03-28T10:15:00.000Z',
    updatedAt: '2025-03-28T10:15:00.000Z',
  },
  {
    id: 14,
    type: 'DEBIT',
    note: 'Achat Amazon',
    amount: EUR(250),
    tags: [MOCK_TAGS[3], MOCK_TAGS[0]],
    provider: MOCK_PROVIDERS[0], // Amazon
    category: MOCK_CATEGORIES[0],
    createdAt: '2025-02-25T14:20:00.000Z',
    updatedAt: '2025-02-25T14:20:00.000Z',
  },
  {
    id: 15,
    type: 'CREDIT',
    note: 'Remboursement ami',
    amount: EUR(75),
    tags: [MOCK_TAGS[2]],
    provider: undefined,
    category: MOCK_CATEGORIES[2],
    createdAt: '2025-01-15T14:30:00.000Z',
    updatedAt: '2025-01-15T14:30:00.000Z',
  },
];

export const getMockTransactionsResponse = () => {
  const allSources = [
    ...MOCK_TRANSACTIONS_CREATED,
    ...MOCK_TRANSACTIONS_BASE,
    ...MOCK_TRANSACTIONS_UPDATED,
  ];

  const merged = allSources.reduce<TransactionDTO[]>(
    (accumulator, transaction) => {
      const existingIndex = accumulator.findIndex(
        (existing) => existing.id === transaction.id
      );
      if (existingIndex >= 0) {
        accumulator[existingIndex] = transaction;
      } else {
        accumulator.push(transaction);
      }
      return accumulator;
    },
    []
  );

  return {
    content: merged as TransactionDTO[],
    page: {
      size: 5,
      number: 0,
      totalElements: merged.length,
      totalPages: Math.ceil(merged.length / 5),
    },
  };
};

export const MOCK_TRANSACTIONS_RESPONSE = getMockTransactionsResponse();
