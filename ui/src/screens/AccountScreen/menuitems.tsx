import { AccessTime, AttachMoney, ConfirmationNumber } from "@mui/icons-material"
import { ACCOUNT, FINES, HISTORICAL_TICKETS } from "urls"
import { MenuItem } from "./types"

export const MENU_ITEMS: MenuItem[] = [
	{
		text: "Aktywne bilety",
		icon: <ConfirmationNumber />,
		url: ACCOUNT,
	},
	{
		text: "Historia biletów",
		icon: <AccessTime />,
		url: `${ACCOUNT}/${HISTORICAL_TICKETS}`,
	},
	{
		text: "Mandaty",
		icon: <AttachMoney />,
		url: `${ACCOUNT}/${FINES}`,
	},
]
