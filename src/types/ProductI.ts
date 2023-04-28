import Review from "./Review";

export default interface ProductI {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
    imagesUrl: string[];
    description: string;
    price: number;
    categoryId: number;
    rating: number;
    ratingCount: number;
    reviews?: Review[];
    favorite: boolean;
    slug: string;
}
