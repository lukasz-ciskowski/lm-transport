import { Lock, Person } from "@mui/icons-material"
import { Alert, Button, CircularProgress, Grid, TextField } from "@mui/material"
import { useAuthDispatcher } from "contexts/AuthContext/hooks"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { logIn } from "./api"
import { LoginForm } from "./types"
import * as S from "./styles"
import { User } from "models/user"

function Login() {
	const authDispatch = useAuthDispatcher()
	const { control, formState, handleSubmit } = useForm<LoginForm>({
		mode: "onBlur",
	})
	const { mutate, isLoading, error } = useMutation(logIn)

	const onSubmit = (data: LoginForm) => {
		mutate(data, {
			onSuccess: (result: User) => {
				authDispatch.logIn({
					login: result.login,
					cardNumber: result.card_number,
					firstName: result.first_name,
					lastName: result.last_name,
				})
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

export default Login
