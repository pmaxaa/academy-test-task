import useFlightStore from './store/flightStore'

export default function FlightsList() {
	const { flights, sortByCost, sortByTime } = useFlightStore()

	return (
		<>
			<div>Flights List</div>
			<button onClick={sortByCost}>Самый дешевый</button>
			<button onClick={sortByTime}>Самый быстрый</button>
			{flights.map(flight => (
				<div key={flight.id}>
					<div>{flight.id}</div>
					<div>Стоимость: {flight.price.grandTotal}</div>
					<div>Время в пути: {flight.itineraries[0].duration}</div>
					<div>
						Количество пересадок: {flight.itineraries[0].segments.length - 1}
					</div>
					<br></br>
				</div>
			))}
		</>
	)
}
