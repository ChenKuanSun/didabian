export interface Order {
  uid: string;
  name?: string;
  imageUrl?: string[];
  menu?: string[];
  deadline?: Date | any;
  list?: OrderList[];
}

export interface OrderList {
  from: string;
  productName: string;
  price: number;
  spec?: string;
  quantity: Date;
}
