export interface Plant {
  _id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
  light?: string;
  water?: string;
  difficulty?: string;
  featured?: boolean;
  nurseryId?: string;
}

export interface PlantListResponse {
  items: Plant[];
  total: number;
}
