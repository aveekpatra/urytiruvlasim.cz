export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  description?: string;
  allergens?: string;
  price: number;
  currency: string;
  isVegetarian?: boolean;
}

export type MenuCategory = 'soup' | 'main' | 'dessert' | 'drink';

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source?: 'google' | 'tripadvisor' | 'facebook';
}

export interface WeddingInquiry {
  name: string;
  email: string;
  phone?: string;
  eventDate?: string;
  guestCount?: number;
  message?: string;
}

export interface OpeningHours {
  days: string;
  hours: string;
}

export interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface Feature {
  icon: 'castle' | 'parking' | 'family';
  title: string;
  description: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: OpeningHours[];
}
