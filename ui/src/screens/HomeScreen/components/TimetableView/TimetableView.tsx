import { Component } from "react"
import { Route, Routes } from "react-router-dom"
import { BUS_LINE } from "urls"
import BusLineView from "./components/BusLineView"

export default class TimetableView extends Component {
	render() {
		return (
			<Routes>
				<Route path={BUS_LINE} element={<BusLineView />} />
			</Routes>
		)
	}
}
