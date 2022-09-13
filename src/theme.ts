import { createTheme } from "@mui/material/styles";

const themeOptions = {
	palette: {
		type: "light",
		primary: {
			main: "#ffffff",
			dark: "#787878",
			gray: "#949ba7",
			blue: "#373f50",
			light: "#DAE1E7",
		},
		secondary: {
			main: "#d23f57",
		},
		background: {
			default: "#f6f9fc",
		},
		text: {
			secondary: "#7d879c",
			primary: "#2B3445",
			main: "949ba7",
		},
	},
	overrides: {
		MuiSwitch: {
			root: {
				width: 42,
				height: 26,
				padding: 0,
				margin: 8,
			},
			switchBase: {
				padding: 1,
				"&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
					transform: "translateX(16px)",
					color: "#fff",
					"& + $track": {
						opacity: 1,
						border: "none",
					},
				},
			},
			thumb: {
				width: 24,
				height: 24,
			},
			track: {
				borderRadius: 13,
				border: "1px solid #bdbdbd",
				backgroundColor: "#fafafa",
				opacity: 1,
				transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
			},
			MuiLink: {
				styleOverrides: {
					root: {
						textDecoration: "none",
					},
				},
			},
		},
	},
};
const theme = createTheme(themeOptions);
export default theme;
