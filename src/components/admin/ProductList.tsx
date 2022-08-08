import { CircularProgress, Select, SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams, GridRenderEditCellParams, GridToolbar, GridValueGetterParams, useGridApiContext } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCategories } from "../../reducers/categorySlice";
import { editProduct, fetchProducts, selectError, selectProducts, selectStatus } from "../../reducers/productsSlice";
import CategoryI from "../../types/CategoryI";
import ProductCreateI from "../../types/ProductCreateI";
import ParseCategories from "../../utils/ParseCategories";
import { IDLE } from "../../utils/states";
import CustomToolbar from "./CustomToolbar";

const CategorySelectEditField = (props: GridRenderCellParams) => {
	const { id, value, field } = props;
	const apiRef = useGridApiContext();
	const categories = useAppSelector(selectCategories);
	let parsedCategories: CategoryI[] = [];
	if (categories !== null) {
		parsedCategories = ParseCategories(categories);
	}
	const handleChange = async (event: SelectChangeEvent) => {
		await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
		apiRef.current.stopCellEditMode({ id, field });
	};
	return (
		<Select value={value} onChange={handleChange} size="small" sx={{ height: 1 }} native autoFocus>
			{parsedCategories.map((val) => {
				return (
					<option key={val.id} value={val.id}>
						{val.categoryName}
					</option>
				);
			})}
		</Select>
	);
};
const renderSelectEditInputCell: GridColDef["renderCell"] = (params) => {
	return <CategorySelectEditField {...params} />;
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
		renderCell: (params: GridRenderCellParams<String>) => <p>{params.row.categoryId}</p>,
	},
];

export default function ProductList() {
	const dispatch = useAppDispatch();
	const products = useAppSelector(selectProducts);
	const productStatus = useAppSelector(selectStatus);

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
	return (
		<Box sx={{ height: 400, width: "100%" }}>
			<DataGrid onCellEditCommit={onCellEdit} rows={products} columns={columns} rowsPerPageOptions={[5, 10, 25, 100]} checkboxSelection disableSelectionOnClick />
		</Box>
	);
}
