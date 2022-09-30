import { StringifyOptions } from "querystring";
import ProductSort from "./SortE";

export default interface ProductParamsI {
	page?: number;
	size?: number;
	sort?: ProductSort;
	categoryId?: number;
	search?: string;
}
