import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteCategory, editCategory, fetchCategories, selectCategories } from "../../reducers/categorySlice";
import CategoryEditI from "../../types/CategoryEditI";
import CategoryI from "../../types/CategoryI";
import ParseCategories from "../../utils/ParseCategories";
import { CategorySelectEditField } from "./CategoriesSelectEditField";

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
    const onCellEdit = (params: any) => {
        const newCategory: CategoryEditI = { [params.field]: params.value, id: params.id };
        dispatch(editCategory(newCategory));
    };
    return (
        <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
                onSelectionModelChange={(ids) => {
                    const selectedIDs: number[] = [];
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
