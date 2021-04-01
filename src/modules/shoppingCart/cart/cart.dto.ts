export class addItemInput {
  productId: string;
  cart_id: string;
  addOn: object;
  quantity: number;
}

export class removeItemInput {
  itemId: string;
  cart_id: string;
}

export class updateItemInput {
  itemId: string;
  cart_id: string;
  quantity: number;
  addOn: object;
}
