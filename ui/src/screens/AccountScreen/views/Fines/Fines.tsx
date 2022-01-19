import { InfoRounded } from "@mui/icons-material"
import {
	Chip,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import { useMutation } from "react-query"
import { getFines } from "./api"
import FineDetails from "./components/FineDetails"

function Fines() {
	const [modalOpen, setModalOpen] = useState<false | number>(false)
	const { mutate, data } = useMutation(getFines)
	useEffect(() => {
		mutate(undefined)
	}, [mutate])

	const handleCloseModal = () => setModalOpen(false)
	const handleOpenModal = (id: number) => () => setModalOpen(id)

	return (
		<>
			{modalOpen && <FineDetails id={modalOpen} onClose={handleCloseModal} />}
			<Typography variant="h6">Mandaty</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Data otrzymania</TableCell>
							<TableCell align="left">Status</TableCell>
							<TableCell align="left">Akcje</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.fines.map((row) => (
							<TableRow
								key={row.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									<Typography variant="body1">
										{moment(row.date).format("dddd, DD MMM. yyyy HH:mm")}
									</Typography>
								</TableCell>
								<TableCell align="left">
									<Chip
										label={row.is_paid ? "Opłacony" : "Do opłacenia"}
										variant="filled"
										color={row.is_paid ? "default" : "error"}
									/>
								</TableCell>
								<TableCell align="left">
									<IconButton onClick={handleOpenModal(row.id)}>
										<InfoRounded />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default Fines
