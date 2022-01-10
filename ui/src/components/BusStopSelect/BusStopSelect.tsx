import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material"
import { BusStop } from "screens/HomeScreen/types"

type Props = SelectProps & { data: BusStop[] }

function BusStopSelect({ data, ...props }: Props) {
	return (
		<FormControl fullWidth size={props.size}>
			<InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
			<Select {...props}>
				{data.map((element) => (
					<MenuItem value={element.id}>{element.name}</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default BusStopSelect
