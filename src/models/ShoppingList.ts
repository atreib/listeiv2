import { ProductModel } from './Product';

export interface ShoppingListModel {
  id: string;
  date: Date;
  products: ProductModel[];
}
