export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    images: {
        [key: string]: string;
    };
    category: 'cosplay' | 'beauty';
    sub_category: string;
    rating: number;
    reviews: number;
    featured: boolean;
    stock: number;
    ali_express_link: string;
}
export interface ProductsResponse {
    products: Product[];
    totalCount: number;
    totalPages: number;
}
