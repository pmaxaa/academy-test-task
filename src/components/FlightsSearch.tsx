import FlightsFilters from './FlightsFilters'
import FlightsForm from './FlightsForm/FlightsForm'
import FlightsList from './FlightsList/FlightsList'

export default function FlightsSearch() {
	return (
		<>
			<FlightsForm />
			<div>
				<FlightsFilters />
				<FlightsList />
			</div>
		</>
	)
}
