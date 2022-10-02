import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import App from "./pages/App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { fetchCategories } from "./reducers/categorySlice";

const container = document.getElementById("root")!;
const root = createRoot(container);

store.dispatch(fetchCategories());

root.render(
	<React.StrictMode>
		<HashRouter>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeProvider>
		</HashRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
