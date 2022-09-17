import { StringLiteral } from "typescript";
export default interface ReviewCreateI {
	id?: number;
	rating: number;
	review: string;
	productId: number;
}
