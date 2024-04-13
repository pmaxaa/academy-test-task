import { useNavigate } from 'react-router-dom'
import useFlightStore from './store/store'

export default function FlightsList() {
	const { flights, filters, sortByCost, sortByTime } = useFlightStore()

	const filteredFlights = flights.filter(item => {
		if (filters.includes('all')) {
			return true
		} else {
			return filters.includes(
				(item.itineraries[0].segments.length - 1).toString()
			)
		}
	})

	const navigate = useNavigate()

	return (
		<>
			<div>Flights List</div>
			<button onClick={sortByCost}>Самый дешевый</button>
			<button onClick={sortByTime}>Самый быстрый</button>
			{filteredFlights.map(flight => (
				<div key={flight.id} onClick={() => navigate(`/flight/${flight.id}`)}>
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
