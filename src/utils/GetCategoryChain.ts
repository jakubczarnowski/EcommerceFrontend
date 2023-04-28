import CategoryI from "../types/CategoryI";

export default function getCategoryChain(parsedCategories: CategoryI[], category: CategoryI) {
    const categoryChain = [category];
    if (category.id === 1) {
        return categoryChain;
    }
    categoryChain.push(
        ...getCategoryChain(
            parsedCategories,
            parsedCategories.find((c) => c.id === category.parentCategoryId) || ({} as CategoryI)
        )
    );
    return categoryChain;
}
