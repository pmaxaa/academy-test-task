import FlightsFilters from './FlightsFilters'
import FlightsForm from './FlightsForm'
import FlightsList from './FlightsList/FlightsList'

export default function FlightsSearch() {
	return (
		<>
			<FlightsForm />
			<FlightsFilters />
			<FlightsList />
		</>
	)
}
