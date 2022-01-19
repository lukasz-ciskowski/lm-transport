import { ShoppingCart } from "@mui/icons-material"
import { Button, CircularProgress, Grid, Pagination, Typography } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import BuyTicketModal from "screens/AccountScreen/components/BuyTicketModal"
import SingleTicket from "screens/AccountScreen/components/SingleTicket"
import { queryActiveTickets } from "./api"
import * as S from "./styles"

const PAGE_SIZE = 10

function Tickets() {
	const { data, isLoading, mutate } = useMutation(queryActiveTickets)
	const [page, setPage] = useState(1)
	const [modalOpen, setModalOpen] = useState(false)

	const handleFetchData = useCallback(() => mutate({ page, page_size: PAGE_SIZE }), [mutate, page])

	useEffect(() => {
		handleFetchData()
	}, [handleFetchData])

	const handleCloseModal = () => setModalOpen(false)
	const handleOpenModal = () => setModalOpen(true)

	const handleSwitchPage = (_: React.ChangeEvent<unknown>, p: number) => setPage(p)


	return (
		<S.Wrapper>
			{modalOpen && <BuyTicketModal onClose={handleCloseModal} onRefreshView={handleFetchData} />}
			<S.Header>
				<Grid container justifyContent="space-between">
					<Typography variant="h6">Aktywne bilety</Typography>
					<Button
						startIcon={<ShoppingCart />}
						variant="contained"
						onClick={handleOpenModal}
					>
						Zakup bilet
					</Button>
				</Grid>
			</S.Header>
			{isLoading && (
				<Grid container xs={12} justifyContent="center">
					<CircularProgress />
				</Grid>
			)}
			{data && (
				<>
					{data.rows.map((row) => (
						<SingleTicket ticket={row} />
					))}
					<S.PaginationContainer>
						<Pagination
							count={Math.ceil(Number(data?.total / PAGE_SIZE))}
							page={page}
							onChange={handleSwitchPage}
						/>
					</S.PaginationContainer>
				</>
			)}
		</S.Wrapper>
	)
}

export default Tickets
