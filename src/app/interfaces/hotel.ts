export interface Hotel {
  location: {
    lat: number;
    lng: number;
  };
  minPrice: {
    amount: number;
    currency: string;
  };
  name: string;
}
