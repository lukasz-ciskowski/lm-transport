import axios from "axios"

export const logout = () => axios.post("/api/logout")
