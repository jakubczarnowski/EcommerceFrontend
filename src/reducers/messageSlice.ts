import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface MessageState {
    message: string;
    error: boolean;
}

const initialState: MessageState = {
    message: "",
    error: false,
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            return { message: action.payload.message, error: action.payload.error };
        },
        clearMessage: () => {
            return { message: "", error: false };
        },
    },
});

export default messageSlice.reducer;
export const { setMessage, clearMessage } = messageSlice.actions;
export const selectMessage = (state: RootState) => ({ message: state.message.message, error: state.message.error });
