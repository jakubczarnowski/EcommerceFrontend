import CategoryI from "../types/CategoryI";

export default function ParseCategories(categories: CategoryI) {
	let newCategories: CategoryI[] = [];
	let category = categories.categoryChildren;
	if (category.length == 0) {
		return [categories];
	}
	category.forEach((category) => {
		let newCat = ParseCategories(category);
		newCategories.push(...newCat);
	});
	newCategories.push(categories);
	return newCategories;
}
