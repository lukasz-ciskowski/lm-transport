import { CircularProgress, Grid, Pagination, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import SingleTicket from "screens/AccountScreen/components/SingleTicket"
import { queryHistoricalTickets } from "./api"
import * as S from "./styles"

const PAGE_SIZE = 10

function Tickets() {
	const { data, isLoading, mutate } = useMutation(queryHistoricalTickets)
	const [page, setPage] = useState(1)

	useEffect(() => {
		mutate({ page, page_size: PAGE_SIZE })
	}, [mutate, page])

	const handleSwitchPage = (_: React.ChangeEvent<unknown>, p: number) => setPage(p)

	if (isLoading)
		return (
			<Grid container xs={12} justifyContent="center">
				<CircularProgress />
			</Grid>
		)

	return (
		<S.Wrapper>
			<S.Header>
				<Typography variant="h6">Historia biletów</Typography>
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
