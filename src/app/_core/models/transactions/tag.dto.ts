export interface TagDTO {
  id: number;
  tagName: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface TagRequestDto {
  tagName: string;
  userId: number;
}
