import { Close } from "@mui/icons-material";
import { Alert, Box, Collapse, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearMessage, selectMessage } from "../reducers/messageSlice";
type Props = {};

const MessageDropdown = (props: Props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { message, error } = useAppSelector(selectMessage);
    if (message && !open) {
        setOpen(true);
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
            dispatch(clearMessage());
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    return (
        <Box sx={{ width: "100%", zIndex: "1202", position: "relative" }}>
            <Collapse in={open} timeout={"auto"} sx={{ mb: 2, paddingBottom: "0", marginBottom: "0" }}>
                <Alert
                    severity={error ? "error" : "info"}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                                dispatch(clearMessage());
                            }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message}
                </Alert>
            </Collapse>
        </Box>
    );
};

export default MessageDropdown;
