import { ShoppingBag } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Profile = () => {
    return (
        <Box>
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "5px",
                    alignItems: "center",
                    backgroundColor: "background.default",
                }}
            >
                <ShoppingBag color="secondary" />
                <Typography variant="h2" sx={{ fontSize: "25px", fontWeight: "bold", marginX: "12px" }}>
                    My Profile
                </Typography>
            </Paper>
        </Box>
    );
};

export default Profile;
