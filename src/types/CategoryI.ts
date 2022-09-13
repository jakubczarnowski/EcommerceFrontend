export default interface CategoryI {
	id: number;
	categoryName: string;
	createdAt: Date;
	modifiedAt: Date;
	description: string;
	parentCategoryId: number;
	parentName?: string;
	imageUrl: string;
	categoryChildren: CategoryI[];
}
