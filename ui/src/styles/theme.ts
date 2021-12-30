import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
	palette: {
		primary: {
			main: "#FFCB77",
		},
		background: {
			default: "#F8F8F8",
			paper: "#FFFFFF",
		},
		text: {
			primary: "#1D1D1D",
		},
		common: {
			black: "#1D1D1D",
		},
	},
	spacing: (factor: number) => `${0.25 * factor}rem`,
})
