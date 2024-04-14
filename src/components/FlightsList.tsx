import { useNavigate } from 'react-router-dom'
import useFlightStore from '../store/store'

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

	const minutes = (str: string) => {
		return Number(str.match(/(?<=H)\d+/))
	}
	const hours = (str: string) => {
		return Number(str.match(/(?<=PT)\d+/))
	}

	const navigate = useNavigate()

	return (
		<>
			<div>Flights List</div>
			<button onClick={sortByCost}>Самый дешевый</button>
			<button onClick={sortByTime}>Самый быстрый</button>
			{filteredFlights.map(flight => (
				<div key={flight.id} onClick={() => navigate(`/flight/${flight.id}`)}>
					<div>{flight.id}</div>
					<img
						src={`https://content.airhex.com/content/logos/airlines_${flight.itineraries[0].segments[0].carrierCode}_100_30_r.png`}
					/>
					<div>
						Стоимость:{' '}
						{new Intl.NumberFormat('ru-RU', {
							style: 'currency',
							currency: 'RUB',
							maximumFractionDigits: 0,
						}).format(parseInt(flight.price.total))}
					</div>
					<div>
						Время в пути: {hours(flight.itineraries[0].duration)}ч{' '}
						{minutes(flight.itineraries[0].duration)}мин
					</div>
					<div>
						Количество пересадок: {flight.itineraries[0].segments.length - 1}
					</div>
					<br></br>
				</div>
			))}
		</>
	)
}
