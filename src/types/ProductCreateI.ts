import { NumberLiteralType } from "typescript";

export default interface ProductCreateI {
	id?: number;
	name?: string;
	imagesUrl?: string[];
	price?: number;
	description?: string;
	categoryId?: number;
}
