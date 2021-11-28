// export class TransactionRequest {
//   subtotal = 0;
//   discount = 0;
//   shipping_cost = 0;
//   tax_percent = 0;
//   total = 0;
//   paid = 0;
//   change = 0;
//   order_list = "x";
//   payment_type = "x";
//   payment_detail = "x";
//   staff_id = "x";
//   seller_id = "x";
//   buyer_id = "x";
//   comment = "x";
// }

export interface TransactionRequest {
    subtotal: number;
    discount: number;
    shipping_cost: number;
    tax_percent: number;
    total: number;
    paid: number;
    change: number;
    order_list: string;
    payment_type: string;
    payment_detail: string;
    staff_id?: string;
    seller_id: string;
    buyer_id: string;
    comment: string;
}


export interface TransactionResponse {
    _id: string;
    subtotal: number;
    discount: number;
    shipping_cost: number;
    tax_percent: number;
    total: number;
    paid: number;
    change: number;
    order_list: string;
    payment_type: any;
    payment_detail: any;
    staff_id: any;
    seller_id: any;
    buyer_id: any;
    comment: any;
    timestamp: Date;
    transaction_id: number;
    __v: number;
    id: number;
}