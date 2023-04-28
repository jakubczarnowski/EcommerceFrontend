import Box from "@mui/material/Box";
import { useState } from "react";
import AdminList from "../components/admin/AdminList";
import IncomeView from "../components/admin/IncomeView";

const AdminPage = () => {
    const [page, setPage] = useState(<IncomeView />);
    const handlePageChange = (page: JSX.Element) => {
        setPage(page);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <AdminList pageChangeCallback={handlePageChange} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {page}
            </Box>
        </Box>
    );
};

export default AdminPage;
