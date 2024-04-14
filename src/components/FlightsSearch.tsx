import FlightsFilters from './FlightsFilters'
import FlightsForm from './FlightsForm'
import FlightsList from './FlightsList'

export default function FlightsSearch() {
	return (
		<div>
			<FlightsForm />
			<FlightsFilters />
			<br />
			<FlightsList />
		</div>
	)
}
