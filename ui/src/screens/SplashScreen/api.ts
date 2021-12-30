import axios from "axios"

export const refresh = () => axios.post("/api/refresh")
