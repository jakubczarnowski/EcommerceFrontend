import { CircularProgress, Select, SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumns, GridRenderCellParams, GridRenderEditCellParams, GridRowId, GridToolbar, GridValueGetterParams, useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCategories } from "../../reducers/categorySlice";
import { editProduct, fetchProducts, selectError, selectProducts, selectStatus } from "../../reducers/productsSlice";
import CategoryI from "../../types/CategoryI";
import ProductCreateI from "../../types/ProductCreateI";
import ParseCategories from "../../utils/ParseCategories";
import { IDLE } from "../../utils/states";
import CustomToolbar from "./CustomToolbar";

export const CategorySelectEditField = (props: GridRenderCellParams) => {
	const { id, value, field } = props;
	const apiRef = useGridApiContext();
	const categories = useAppSelector(selectCategories);
	let parsedCategories: CategoryI[] = [];
	if (categories !== null) {
		parsedCategories = ParseCategories(categories);
	}
	const handleChange = async (event: SelectChangeEvent) => {
		await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
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
