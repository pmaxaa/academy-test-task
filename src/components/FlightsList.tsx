import useFlightStore from './store/flightStore'

export default function FlightsList() {
	const { flights } = useFlightStore()

	return (
		<>
			Flights List
			{flights.map(flight => (
				<div>
					<div>{flight.id}</div>
					<div>{flight.price.grandTotal}</div>
				</div>
			))}
		</>
	)
}
