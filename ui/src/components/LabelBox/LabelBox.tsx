import { Typography } from "@mui/material"
import * as S from "./styles"

interface Props {
	title: string
	subtitle: string
}

function LabelBox({ title, subtitle }: Props) {
	return (
		<S.TitleValue>
			<Typography variant="caption">{subtitle}</Typography>
			<Typography>{title}</Typography>
		</S.TitleValue>
	)
}

export default LabelBox
