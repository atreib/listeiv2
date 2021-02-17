import { ProductModel } from './Product';

export interface ShoppingListModel {
  id: string;
  products: ProductModel[];
}
