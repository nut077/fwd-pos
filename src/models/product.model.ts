export default interface Product {
    _id?: string;
    name: string;
    stock: number;
    price: number;
    created: Date;
    product_id: number;
    __v?: number;
    image?: string;
}