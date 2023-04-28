import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";

function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ backgroundColor: "background.default" }}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <IconButton>
                <Delete />
            </IconButton>
        </GridToolbarContainer>
    );
}
export default CustomToolbar;
