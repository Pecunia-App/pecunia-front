export interface ProviderDTO {
  id: number;
  providerName: string;
}

export interface ProviderCreateDTO {
  providerName: string;
  userId: number;
}
