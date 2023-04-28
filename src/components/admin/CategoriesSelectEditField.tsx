import { Select, SelectChangeEvent } from "@mui/material";
import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "../../reducers/categorySlice";
import CategoryI from "../../types/CategoryI";
import ParseCategories from "../../utils/ParseCategories";

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
