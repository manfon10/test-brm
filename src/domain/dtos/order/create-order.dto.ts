export interface CreateOrderDto {
  user_id: number;
}

export interface CreateOrderRequestDto {
  items: Items[];
  user_id: number;
}

export interface SaveItemsDto {
  quantity: number;
  product_id: number;
  subtotal: number;
  unit_price: number;
  order_id: number;
  user_id: number;
}

interface Items {
  product_id: number;
  quantity: number;
}
