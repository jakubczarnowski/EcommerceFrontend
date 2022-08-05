import Category from "./CategoryI";

export default interface ProductI {
	id: number;
	createdAt: Date;
	modifiedAt: Date;
	name: string;
	imagesUrl: string[];
	description: string;
	price: number;
	categoryId: number;
}
