import * as S from "./styles"

interface Props
	extends Omit<
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		"ref"
	> {
	number: number
}

function BusLineBox({ number, ...props }: Props) {
	return <S.Box {...props}>{number}</S.Box>
}

export default BusLineBox
