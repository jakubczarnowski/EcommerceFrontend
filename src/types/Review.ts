import { NumberLiteralType } from "typescript";
export default interface Review {
	id: number;
	name: string;
	postDate: Date;
	rating: number;
	review: string;
}
