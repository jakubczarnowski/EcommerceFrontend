import { Button, CircularProgress, Select, SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumns, GridRenderCellParams, GridRenderEditCellParams, GridRowId, GridToolbar, GridValueGetterParams, useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteCategory, fetchCategories, selectCategories } from "../../reducers/categorySlice";
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

export default function CategoryList() {
	const categories = useAppSelector(selectCategories);
	const dispatch = useAppDispatch();
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	let parsedCategories: CategoryI[] = [];
	if (categories !== null) {
		parsedCategories = ParseCategories(categories);
	}
	const handleDeleteClick = async (id: number) => {
		const { failed } = await dispatch(deleteCategory(id)).unwrap();
		if (!failed) {
			dispatch(fetchCategories());
		}
	};
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 90 },
		{
			field: "categoryName",
			headerName: "Category name",
			width: 150,
			editable: true,
		},
		{
			field: "description",
			headerName: "Category description",
			width: 150,
			editable: true,
		},
		{
			field: "parentCategoryId",
			headerName: "Parent Category Id",
			type: "number",
			width: 200,
			editable: false, // TODO nie pokazywac podrzednych kategorii
			renderCell: (params) => (
				<p>
					{
						parsedCategories.find((val) => {
							return val.id == params.row.parentCategoryId;
						})?.categoryName
					}
				</p>
			),
		},
		{
			field: "button",
			headerName: "",
			type: "action",
			width: 150,
			renderCell: (params) => (
				<Button color="secondary" onClick={() => handleDeleteClick(params.row.id)}>
					Delete
				</Button>
			),
		},
	];
	console.log(selectedIds);
	const onCellEdit = (params: any) => {};
	return (
		<Box sx={{ height: 400, width: "100%" }}>
			<DataGrid
				onSelectionModelChange={(ids) => {
					let selectedIDs: number[] = [];
					// you have to parse the type
					ids.forEach((val) => {
						selectedIDs.push(Number(val));
					});
					setSelectedIds(selectedIDs);
				}}
				onCellEditCommit={onCellEdit}
				rows={parsedCategories}
				columns={columns}
				rowsPerPageOptions={[5, 10, 25, 100]}
				checkboxSelection
				disableSelectionOnClick
			/>
		</Box>
	);
}
