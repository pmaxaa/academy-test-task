import { useNavigate } from 'react-router-dom'
import useFlightStore from './store/store'

export default function FlightsList() {
	const { flights, sortByCost, sortByTime } = useFlightStore()

	const navigate = useNavigate()

	return (
		<>
			<div>Flights List</div>
			<button onClick={sortByCost}>Самый дешевый</button>
			<button onClick={sortByTime}>Самый быстрый</button>
			{flights.map(flight => (
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
