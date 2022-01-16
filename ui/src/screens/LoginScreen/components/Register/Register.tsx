import { CreditCard, Edit, Lock, Person } from "@mui/icons-material"
import { Alert, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { register } from "./api"
import { RegisterForm } from "./types"
import * as S from "./styles"
import { TabValues } from "screens/LoginScreen/types"
import { toast } from "react-toastify"
import { theme } from "styles/theme"

interface Props {
	onChangeTab: (tab: TabValues) => void
}

function Register({ onChangeTab }: Props) {
	const { control, formState, handleSubmit, getValues } = useForm<RegisterForm>({
		mode: "onBlur",
	})
	const { mutate, isLoading, error } = useMutation(register)

	const onSubmit = (data: RegisterForm) => {
		mutate(data, {
			onSuccess: () => {
				onChangeTab(TabValues.Login)
				toast.success("Teraz możesz sie zalogować")
			},
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{isLoading && (
				<S.LoadingWrapper>
					<CircularProgress />
				</S.LoadingWrapper>
			)}
			<Grid container gap={10}>
				<Grid item container xs={12} gap={5}>
					<Grid item xs={12}>
						<Controller
							name="login"
							control={control}
							rules={{
								required: "Login wymagany",
								minLength: 3,
								maxLength: 100,
							}}
							render={({ field }) => (
								<TextField
									label="Login"
									size="small"
									style={{ width: "100%" }}
									InputProps={{
										startAdornment: <Person />,
									}}
									error={!!formState.errors.login}
									helperText={formState.errors.login?.message}
									{...field}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="password"
							control={control}
							rules={{
								required: "Hasło wymagane",
								minLength: {
									value: 6,
									message: "Hasło powinno zawierac min 6 znakówe",
								},
								maxLength: 100,
							}}
							render={({ field }) => (
								<TextField
									type="password"
									label="Hasło"
									size="small"
									style={{ width: "100%" }}
									error={!!formState.errors.password}
									helperText={formState.errors.password?.message}
									InputProps={{
										startAdornment: <Lock />,
									}}
									{...field}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="confirm_password"
							control={control}
							rules={{
								required: "Hasło wymagane",
								minLength: {
									value: 6,
									message: "Hasło powinno zawierac min 6 znakówe",
								},
								validate: (value) =>
									getValues("password") === value || "hasła się nie zgadzają",
								maxLength: 100,
							}}
							render={({ field }) => (
								<TextField
									type="password"
									label="Powtórz hasło"
									size="small"
									style={{ width: "100%" }}
									error={!!formState.errors.confirm_password}
									helperText={formState.errors.confirm_password?.message}
									InputProps={{
										startAdornment: <Lock />,
									}}
									{...field}
								/>
							)}
						/>
					</Grid>
					<Typography variant="body1" color={theme.palette.grey[400]}>
						Dane personalne
					</Typography>
					<Grid item xs={12}>
						<Controller
							name="first_name"
							control={control}
							rules={{
								required: "Pole wymagane",
								minLength: 1,
								maxLength: 100,
							}}
							render={({ field }) => (
								<TextField
									label="Imię"
									size="small"
									style={{ width: "100%" }}
									error={!!formState.errors.first_name}
									helperText={formState.errors.first_name?.message}
									InputProps={{
										startAdornment: <Edit />,
									}}
									{...field}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="last_name"
							control={control}
							rules={{
								required: "Pole wymagane",
								minLength: 1,
								maxLength: 100,
							}}
							render={({ field }) => (
								<TextField
									label="Nazwisko"
									size="small"
									style={{ width: "100%" }}
									error={!!formState.errors.last_name}
									helperText={formState.errors.last_name?.message}
									InputProps={{
										startAdornment: <Edit />,
									}}
									{...field}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="card_number"
							control={control}
							rules={{
								required: "Pole wymagane",
								minLength: { value: 10, message: "Niepoprawny numer" },
								maxLength: { value: 10, message: "Niepoprawny numer" },
							}}
							render={({ field }) => (
								<TextField
									label="Numer karty"
									size="small"
									style={{ width: "100%" }}
									error={!!formState.errors.card_number}
									helperText={formState.errors.card_number?.message}
									InputProps={{
										startAdornment: <CreditCard />,
									}}
									{...field}
								/>
							)}
						/>
						<Typography variant="caption" color={theme.palette.grey[300]}>
							Numer karty składa sie z 10 znaków
						</Typography>
					</Grid>
				</Grid>
				<Grid
					item
					container
					xs={12}
					justifyContent="center"
					flexDirection="column"
					alignItems="center"
					gap={5}
				>
					{error && (
						<Alert severity="error" style={{ width: "100%" }}>
							Niepoprawne dane użytkownika
						</Alert>
					)}
					<Button
						type="submit"
						variant="contained"
						size="large"
						disabled={!formState.isValid}
						style={{ width: 300 }}
					>
						Zaloguj
					</Button>
				</Grid>
			</Grid>
		</form>
	)
}

export default Register
