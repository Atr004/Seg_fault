export interface FoodItem {
  id: string;
  name: string;
  expiryDate: Date;
  quantity: string;
  category: string;
  image?: string;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  image: string;
}

export type Tab = 'pantry' | 'shopping' | 'analytics' | 'settings';