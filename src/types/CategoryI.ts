export default interface CategoryI{
    id:string,
    createdAt:Date,
    modifiedAt:Date,
    description:string,
    imageUrl:string,
    categoryChildren:CategoryI[],
}