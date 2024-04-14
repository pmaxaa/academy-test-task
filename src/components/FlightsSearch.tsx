import FlightsFilters from './FlightsFilters/FlightsFilters'
import FlightsForm from './FlightsForm/FlightsForm'
import FlightsList from './FlightsList/FlightsList'

export default function FlightsSearch() {
	return (
		<>
			<FlightsForm />
			<div className='flights'>
				<FlightsFilters />
				<FlightsList />
			</div>
		</>
	)
}
