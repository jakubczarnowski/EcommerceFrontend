import { CircularProgress, Select, SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams, GridRenderEditCellParams, GridToolbar, GridValueGetterParams, useGridApiContext } from "@mui/x-data-grid";
import { useEffect } from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCategories } from "../../reducers/categorySlice";
import { editProduct, fetchProducts, selectError, selectProducts, selectStatus } from "../../reducers/productsSlice";
import CategoryI from "../../types/CategoryI";
import ProductCreateI from "../../types/ProductCreateI";
import ParseCategories from "../../utils/ParseCategories";
import { IDLE } from "../../utils/states";
import { CategorySelectEditField } from "./CategoriesSelectEditField";
import CustomToolbar from "./CustomToolbar";

const renderSelectEditInputCell: GridColDef["renderCell"] = (params) => {
	return <CategorySelectEditField {...params} />;
};

export default function ProductList() {
	const dispatch = useAppDispatch();
	const products = useAppSelector(selectProducts);
	const productStatus = useAppSelector(selectStatus);
	const categories = useAppSelector(selectCategories);
	let parsedCategories: CategoryI[] = [];
	if (categories !== null) {
		parsedCategories = ParseCategories(categories);
	}
	useEffect(() => {
		if (productStatus === IDLE) {
			dispatch(fetchProducts({}));
			// #TODO TODO pagination
		}
	}, []);
	const onCellEdit = (params: any) => {
		let newProduct: ProductCreateI = { [params.field]: params.value, id: params.id };
		console.log(newProduct);
		dispatch(editProduct(newProduct));
	};
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 90 },
		{
			field: "name",
			headerName: "Product name",
			width: 150,
			editable: true,
		},
		{
			field: "description",
			headerName: "Product description",
			width: 150,
			editable: true,
		},
		{
			field: "price",
			headerName: "Price",
			type: "number",
			width: 110,
			editable: true,
		},
		{
			field: "categoryId",
			headerName: "Category name",
			type: "number",
			width: 160,
			editable: true,
			renderEditCell: renderSelectEditInputCell,
			renderCell: (params: GridRenderCellParams<String>) => <p>{parsedCategories.find((val) => val.id === params.row.categoryId)?.categoryName}</p>,
		},
	];

	return (
		<Box sx={{ height: 400, width: "100%" }}>
			<DataGrid onCellEditCommit={onCellEdit} rows={products} columns={columns} rowsPerPageOptions={[5, 10, 25, 100]} checkboxSelection disableSelectionOnClick />
		</Box>
	);
}
