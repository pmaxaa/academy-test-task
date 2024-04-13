import FlightsFilters from './FlightsFilters'
import FlightsList from './FlightsList'
import Form from './Form'

export default function FlightsSearch() {
	return (
		<div>
			<Form />
			<FlightsFilters />
			<br />
			<FlightsList />
		</div>
	)
}
