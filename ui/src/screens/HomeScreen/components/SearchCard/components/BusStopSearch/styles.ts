import styled from "styled-components"
import { theme } from "styles/theme"

export const DayPickerWrapper = styled.div`
	.MuiFormControl-root {
		width: 100%;
	}
`

export const Form = styled.form`
	margin-bottom: ${theme.spacing(8)};
	padding: 0 ${theme.spacing(2)};
`


export const Result = styled.div`
	margin-top: ${theme.spacing(3)};
	padding: 0 ${theme.spacing(2)};
`
