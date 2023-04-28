import CategoryI from "../types/CategoryI";

export default function ParseCategories(categories: CategoryI) {
    const newCategories: CategoryI[] = [];
    const category = categories?.categoryChildren || [];
    if (category.length == 0) {
        return [categories];
    }
    category.forEach((category) => {
        const newCat = ParseCategories(category);
        newCategories.push(...newCat);
    });
    newCategories.push(categories);
    return newCategories;
}
