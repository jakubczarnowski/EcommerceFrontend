import { StringifyOptions } from "querystring";

export default interface ProductParamsI {
	page?: number;
	size?: number;
	categoryId?: number;
	search?: string;
}
