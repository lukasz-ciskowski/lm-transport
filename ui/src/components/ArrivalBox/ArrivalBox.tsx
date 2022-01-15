import * as S from "./styles"

interface Props
	extends Omit<
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		"ref"
	> {
	text: string
}

function ArrivalBox({ text, ...props }: Props) {
	return <S.Box {...props}>{text}</S.Box>
}

export default ArrivalBox
